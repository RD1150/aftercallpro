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
SUBSCRIPTION_PLANS = {
    'core': {
        'name': 'Core',
        'price_monthly': 9900,    # $99.00/mo
        'price_yearly': 99000,    # $990.00/yr
        'minutes': 1500,
        'stripe_price_id_monthly': 'price_1SdJ4iFdaiPvq2Of6qx8oK7G',
        'stripe_price_id_yearly':  'price_1SdJ4iFdaiPvq2OfQQbvUxyV',
    },
    'elite': {
        'name': 'Elite',
        'price_monthly': 29700,   # $297.00/mo
        'price_yearly': 297000,   # $2,970.00/yr
        'minutes': 5000,
        'stripe_price_id_monthly': 'price_1T3AYpFdaiPvq2OfEVuJYK2P',
        'stripe_price_id_yearly':  'price_1T3AYpFdaiPvq2OfZZoxetL8',
    }
}


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
        # Build success and cancel URLs relative to the request host
        base_url = request.host_url.rstrip('/')
        checkout_session = stripe.checkout.Session.create(
            customer_email=business.email,
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f"{base_url}/dashboard?subscription=success&session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{base_url}/pricing",
            metadata={
                'business_id': str(business_id),
                'plan': plan
            }
        )

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
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

    if not webhook_secret:
        # In development without a webhook secret, process events directly
        import json
        try:
            event = json.loads(payload)
        except Exception:
            return jsonify({'error': 'Invalid payload'}), 400
    else:
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError:
            return jsonify({'error': 'Invalid payload'}), 400
        except stripe.error.SignatureVerificationError:
            return jsonify({'error': 'Invalid signature'}), 400

    # Handle the event
    event_type = event['type']

    if event_type == 'checkout.session.completed':
        handle_checkout_completed(event['data']['object'])

    elif event_type == 'customer.subscription.updated':
        handle_subscription_updated(event['data']['object'])

    elif event_type == 'customer.subscription.deleted':
        handle_subscription_deleted(event['data']['object'])

    elif event_type == 'invoice.payment_failed':
        handle_payment_failed(event['data']['object'])

    return jsonify({'status': 'success'}), 200


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
        db.session.commit()

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
                'price': plan['price'],
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
            'price': plan['price'],
            'minutes': plan['minutes']
        }
        for plan_id, plan in SUBSCRIPTION_PLANS.items()
    }), 200
