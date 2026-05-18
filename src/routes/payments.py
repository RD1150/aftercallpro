from flask import Blueprint, request, jsonify, session
import stripe
import os
from src.models.call import Business, db
from src.routes.auth import login_required

payments_bp = Blueprint('payments', __name__)

# Initialize Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

# Subscription tier pricing — matches Pricing.jsx plans
# Two paid plans: Core ($99/mo or $990/yr) and Elite ($297/mo or $2,970/yr)
# Founding-member program: the first FOUNDING_SEATS businesses to complete
# checkout lock in 50% off for life; everyone after gets 50% off their first
# month. There is no free tier and no free trial — a card is required at
# checkout for everyone.
FOUNDING_SEATS = 25

SUBSCRIPTION_PLANS = {
    'core': {
        'name': 'Core',
        'price_monthly': 9900,    # $99.00/mo
        'price_yearly': 99000,    # $990.00/yr
        'minutes': 1500,
        'stripe_price_id_monthly': 'price_1TYHAJPT8zsJs3qklPOTWbUI',
        'stripe_price_id_yearly':  'price_1TYHAJPT8zsJs3qkOftvyXoI',
    },
    'elite': {
        'name': 'Elite',
        'price_monthly': 29700,   # $297.00/mo
        'price_yearly': 297000,   # $2,970.00/yr
        'minutes': 5000,
        'stripe_price_id_monthly': 'price_1TYHAKPT8zsJs3qkgMKUPm0t',
        'stripe_price_id_yearly':  'price_1TYHAKPT8zsJs3qkU1GJh3Nj',
    }
}


def _founding_status():
    """Current state of the founding-member program. Eligibility is by count
    of businesses already tagged `founding_member` — the first FOUNDING_SEATS
    completed checkouts. After that the window closes and new customers get a
    first-month discount instead."""
    try:
        taken = Business.query.filter_by(founding_member=True).count()
    except Exception:
        taken = 0
    seats_left = max(0, FOUNDING_SEATS - taken)
    return {
        'founding_total': FOUNDING_SEATS,
        'founding_taken': taken,
        'seats_left': seats_left,
        'window': 'founding' if seats_left > 0 else 'first_month',
    }


@payments_bp.route('/founding-status', methods=['GET'])
def founding_status():
    """Public — how many founding-member seats remain, for marketing copy."""
    return jsonify(_founding_status()), 200


@payments_bp.route('/create-checkout-session', methods=['POST'])
@login_required
def create_checkout_session():
    """Create a Stripe Checkout session for a subscription plan."""
    data = request.get_json()
    plan = data.get('plan', 'core')
    billing = data.get('billing', 'monthly')  # 'monthly' or 'yearly'
    # Frontend can pass the price_id directly (preferred) or we look it up
    price_id = data.get('price_id')

    if plan not in SUBSCRIPTION_PLANS:
        return jsonify({'error': 'Invalid subscription plan'}), 400

    business_id = session.get('business_id')
    business = Business.query.get(business_id)

    if not business:
        return jsonify({'error': 'Business not found'}), 404

    # Use price_id from frontend if provided, otherwise look up from plan config
    if not price_id:
        key = 'stripe_price_id_yearly' if billing == 'yearly' else 'stripe_price_id_monthly'
        price_id = SUBSCRIPTION_PLANS[plan].get(key)

    if not price_id:
        return jsonify({'error': f'Stripe price ID for plan "{plan}" ({billing}) is not configured.'}), 500

    try:
        base_url = request.host_url.rstrip('/')

        # Decide which discount to auto-apply server-side. The customer never
        # enters a code: founding members (first 25 by count) get the 50%-off-
        # for-life coupon; everyone after gets the 50%-off-first-month coupon.
        status = _founding_status()
        if status['window'] == 'founding':
            discount_coupon = os.getenv('STRIPE_FOUNDING_COUPON_ID', 'FOUNDING50')
        else:
            # Must be created in Stripe (50% off, duration=once). If unset,
            # the #26+ customer simply pays full price rather than erroring.
            discount_coupon = os.getenv('STRIPE_FIRSTMONTH_COUPON_ID')

        session_kwargs = dict(
            customer_email=business.email,
            payment_method_types=['card'],
            line_items=[{'price': price_id, 'quantity': 1}],
            mode='subscription',
            success_url=f"{base_url}/dashboard?subscription=success&session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{base_url}/pricing",
            # `app: aftercallpro` tags every charge so AfterCallPro revenue can
            # be separated from Amped / Primed inside the shared MindRocket
            # Stripe account (all three are one legal entity, one account).
            metadata={
                'app': 'aftercallpro',
                'business_id': str(business_id),
                'plan': plan,
                'founding_window': status['window'],
            },
            # Stamp the subscription itself too — recurring-revenue reports
            # group by subscription, not the one-off checkout session.
            subscription_data={
                'metadata': {
                    'app': 'aftercallpro',
                    'business_id': str(business_id),
                    'plan': plan,
                    'founding_window': status['window'],
                },
            },
        )
        if discount_coupon:
            # Stripe forbids combining `discounts` with `allow_promotion_codes`.
            session_kwargs['discounts'] = [{'coupon': discount_coupon}]
        else:
            # No first-month coupon configured — fall back to letting the
            # customer enter a promo code manually at Checkout.
            session_kwargs['allow_promotion_codes'] = True

        checkout_session = stripe.checkout.Session.create(**session_kwargs)

        return jsonify({'sessionId': checkout_session.id, 'url': checkout_session.url}), 200

    except stripe.error.StripeError as e:
        return jsonify({'error': str(e.user_message)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@payments_bp.route('/create-customer-portal-session', methods=['POST'])
@login_required
def create_customer_portal_session():
    """Create a Stripe Customer Portal session for managing billing."""
    business_id = session.get('business_id')
    business = Business.query.get(business_id)

    if not business or not business.stripe_customer_id:
        return jsonify({'error': 'No active subscription found. Please subscribe to a plan first.'}), 404

    try:
        base_url = request.host_url.rstrip('/')
        portal_session = stripe.billing_portal.Session.create(
            customer=business.stripe_customer_id,
            return_url=f"{base_url}/dashboard",
        )

        return jsonify({'url': portal_session.url}), 200

    except stripe.error.StripeError as e:
        return jsonify({'error': str(e.user_message)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@payments_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    """Handle Stripe webhook events for subscription lifecycle management."""
    import json
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

    if not webhook_secret:
        # No signing secret. In production this is unsafe — anyone could POST a
        # forged checkout.session.completed to activate an account and trigger
        # a Twilio number purchase — so fail CLOSED. Only process unverified
        # events outside production (local dev).
        if os.environ.get('FLASK_ENV') == 'production':
            import logging
            logging.getLogger(__name__).error(
                'Stripe webhook rejected: STRIPE_WEBHOOK_SECRET not set in production.'
            )
            return jsonify({'error': 'Webhook not configured'}), 500
        try:
            event = json.loads(payload)
        except Exception:
            return jsonify({'error': 'Invalid payload'}), 400
    else:
        try:
            stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        except ValueError:
            return jsonify({'error': 'Invalid payload'}), 400
        except stripe.error.SignatureVerificationError:
            return jsonify({'error': 'Invalid signature'}), 400
        # Signature verified. Use a plain-dict view of the payload — the event
        # handlers call dict.get(), which Stripe's StripeObject does NOT
        # support on modern SDK versions (it raises AttributeError).
        event = json.loads(payload)

    # Handle the event
    event_type = event['type']
    handlers = {
        'checkout.session.completed': handle_checkout_completed,
        'customer.subscription.updated': handle_subscription_updated,
        'customer.subscription.deleted': handle_subscription_deleted,
        'invoice.payment_failed': handle_payment_failed,
    }
    handler = handlers.get(event_type)
    if handler:
        try:
            handler(event['data']['object'])
        except Exception as e:
            # Don't return 200 on a failed activation — a paying customer
            # would silently get nothing. Roll back, alert ops, and return
            # 500 so Stripe retries the webhook (it retries for ~3 days).
            db.session.rollback()
            import logging
            logging.getLogger(__name__).error(
                'Stripe webhook handler failed (%s, event %s): %s',
                event_type, event.get('id'), e, exc_info=True,
            )
            _alert_webhook_failure(event_type, event.get('id'), e)
            return jsonify({'error': 'Webhook handler failed'}), 500

    return jsonify({'status': 'success'}), 200


def _alert_provisioning_failure(business, error):
    """A paid customer's Twilio number could not be provisioned. Log it loudly
    and email ops so a number can be assigned by hand before the customer
    notices it isn't working."""
    import logging
    logging.getLogger(__name__).error(
        'Twilio provisioning FAILED for paid business %s (%s): %s',
        business.id, business.email, error,
    )
    try:
        from src.services.email_service import email_service
        ops_email = os.getenv('OPS_ALERT_EMAIL', 'support@aftercallpro.com')
        email_service.send_email(
            ops_email,
            f'[AfterCallPro] ACTION NEEDED — number provisioning failed for {business.name}',
            f'<p>A paying customer has no Twilio number. Provision one manually '
            f'and set it on their business record before they try to use the service.</p>'
            f'<ul>'
            f'<li><strong>Business:</strong> {business.name} (id {business.id})</li>'
            f'<li><strong>Email:</strong> {business.email}</li>'
            f'<li><strong>Phone:</strong> {business.phone_number}</li>'
            f'<li><strong>Error:</strong> {error}</li>'
            f'</ul>',
        )
    except Exception as e:
        logging.getLogger(__name__).error(
            'Could not send provisioning-failure alert for business %s: %s',
            business.id, e,
        )


def _alert_webhook_failure(event_type, event_id, error):
    """A Stripe webhook handler threw. Stripe will retry, but email ops so a
    human can confirm the customer was actually activated."""
    import logging
    try:
        from src.services.email_service import email_service
        ops_email = os.getenv('OPS_ALERT_EMAIL', 'support@aftercallpro.com')
        email_service.send_email(
            ops_email,
            f'[AfterCallPro] Stripe webhook failed — {event_type}',
            f'<p>A Stripe webhook handler raised an exception. Stripe will retry, '
            f'but please verify the affected customer was activated correctly.</p>'
            f'<ul>'
            f'<li><strong>Event type:</strong> {event_type}</li>'
            f'<li><strong>Event ID:</strong> {event_id}</li>'
            f'<li><strong>Error:</strong> {error}</li>'
            f'</ul>',
        )
    except Exception as e:
        logging.getLogger(__name__).error(
            'Could not send webhook-failure alert for %s: %s', event_id, e,
        )


def handle_checkout_completed(session_data):
    """Activate subscription after successful checkout."""
    business_id = session_data.get('metadata', {}).get('business_id')
    plan = session_data.get('metadata', {}).get('plan')
    customer_id = session_data.get('customer')
    subscription_id = session_data.get('subscription')

    if not business_id:
        return

    business = Business.query.get(int(business_id))
    if business:
        business.stripe_customer_id = customer_id
        business.stripe_subscription_id = subscription_id
        business.subscription_tier = plan
        business.monthly_minutes_limit = SUBSCRIPTION_PLANS.get(plan, {}).get('minutes', 500)
        business.subscription_status = 'active'

        # Tag founding member if this checkout was given the founding deal.
        # create_checkout_session stamps metadata['founding_window']='founding'
        # exactly when it auto-applies the founding (50%-off-for-life) coupon,
        # so that stamp is the source of truth. Reading the coupon back off the
        # Subscription is unreliable — the modern Stripe API replaced the
        # singular `discount` field with a `discounts` array, so the old
        # lookup silently found nothing and never tagged anyone.
        founding_window = session_data.get('metadata', {}).get('founding_window')
        if founding_window == 'founding':
            business.founding_member = True

        db.session.commit()

        # Provision the business's dedicated Twilio number now that payment
        # has cleared — done here, not at signup, so unpaid accounts never
        # trigger a number purchase. The `if not business.twilio_number`
        # guard makes this safe against Stripe delivering the webhook twice.
        if not business.twilio_number:
            try:
                from src.services.twilio_provisioning import provision_number_for_business
                biz_phone = business.phone_number or ''
                area_code = biz_phone.lstrip('+').lstrip('1')[:3] or None
                result = provision_number_for_business(business, area_code=area_code)
                if result.get('success'):
                    business.twilio_number = result['phone_number']
                    business.twilio_number_sid = result['sid']
                    business.twilio_number_provisioned = True
                    db.session.commit()
                else:
                    _alert_provisioning_failure(business, result.get('error'))
            except Exception as e:
                db.session.rollback()
                _alert_provisioning_failure(business, str(e))

        # Trigger the onboarding automation (replaces GHL 'ACP – Paid' workflow)
        try:
            from src.services.automations import trigger_payment_onboarding
            trigger_payment_onboarding(business)
        except Exception as e:
            import logging
            logging.getLogger(__name__).error('Onboarding automation failed: %s', e)


def handle_subscription_updated(subscription):
    """Sync subscription status changes."""
    customer_id = subscription.get('customer')
    status = subscription.get('status')

    business = Business.query.filter_by(stripe_customer_id=customer_id).first()
    if business:
        business.subscription_status = status
        db.session.commit()


def handle_subscription_deleted(subscription):
    """Handle subscription cancellation — downgrade to free tier."""
    customer_id = subscription.get('customer')

    business = Business.query.filter_by(stripe_customer_id=customer_id).first()
    if business:
        business.subscription_status = 'cancelled'
        business.subscription_tier = 'free'
        business.monthly_minutes_limit = 0
        db.session.commit()


def handle_payment_failed(invoice):
    """Mark subscription as past_due on payment failure."""
    customer_id = invoice.get('customer')

    business = Business.query.filter_by(stripe_customer_id=customer_id).first()
    if business:
        business.subscription_status = 'past_due'
        db.session.commit()


@payments_bp.route('/subscription-info', methods=['GET'])
@login_required
def get_subscription_info():
    """Return the current subscription details for the logged-in business."""
    business_id = session.get('business_id')
    business = Business.query.get(business_id)

    if not business:
        return jsonify({'error': 'Business not found'}), 404

    return jsonify({
        'plan': business.subscription_tier or 'free',
        'status': business.subscription_status or 'active',
        'minutes_limit': business.monthly_minutes_limit or 0,
        'minutes_used': business.minutes_used or 0,
        'has_active_subscription': bool(business.stripe_customer_id),
        'plans': {
            plan_id: {
                'name': plan['name'],
                'price_monthly': plan['price_monthly'],
                'price_yearly': plan['price_yearly'],
                'minutes': plan['minutes']
            }
            for plan_id, plan in SUBSCRIPTION_PLANS.items()
        }
    }), 200


@payments_bp.route('/plans', methods=['GET'])
def get_plans():
    """Public endpoint — return available subscription plans."""
    return jsonify({
        plan_id: {
            'name': plan['name'],
            'price_monthly': plan['price_monthly'],
            'price_yearly': plan['price_yearly'],
            'minutes': plan['minutes']
        }
        for plan_id, plan in SUBSCRIPTION_PLANS.items()
    }), 200
