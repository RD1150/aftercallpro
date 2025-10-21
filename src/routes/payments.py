from flask import Blueprint, request, jsonify, session
import stripe
import os
from src.models.call import Business, db
from src.routes.auth import login_required

payments_bp = Blueprint('payments', __name__)

# Initialize Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

# Subscription tier pricing
SUBSCRIPTION_PLANS = {
    'starter': {
        'name': 'Starter',
        'price': 4900,  # $49.00 in cents
        'minutes': 500,
        'stripe_price_id': os.getenv('STRIPE_STARTER_PRICE_ID')
    },
    'pro': {
        'name': 'Pro',
        'price': 14900,  # $149.00 in cents
        'minutes': 2000,
        'stripe_price_id': os.getenv('STRIPE_PRO_PRICE_ID')
    },
    'business': {
        'name': 'Business',
        'price': 39900,  # $399.00 in cents
        'minutes': 6000,
        'stripe_price_id': os.getenv('STRIPE_BUSINESS_PRICE_ID')
    }
}

@payments_bp.route('/create-checkout-session', methods=['POST'])
@login_required
def create_checkout_session():
    """Create a Stripe checkout session for subscription"""
    data = request.get_json()
    plan = data.get('plan', 'starter')
    
    if plan not in SUBSCRIPTION_PLANS:
        return jsonify({'error': 'Invalid subscription plan'}), 400
    
    business_id = session.get('business_id')
    business = Business.query.get(business_id)
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    try:
        # Create Stripe checkout session
        checkout_session = stripe.checkout.Session.create(
            customer_email=business.email,
            payment_method_types=['card'],
            line_items=[{
                'price': SUBSCRIPTION_PLANS[plan]['stripe_price_id'],
                'quantity': 1,
            }],
            mode='subscription',
            success_url=request.host_url + 'settings?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.host_url + 'settings',
            metadata={
                'business_id': business_id,
                'plan': plan
            }
        )
        
        return jsonify({'sessionId': checkout_session.id}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/create-customer-portal-session', methods=['POST'])
@login_required
def create_customer_portal_session():
    """Create a Stripe customer portal session for managing subscription"""
    business_id = session.get('business_id')
    business = Business.query.get(business_id)
    
    if not business or not business.stripe_customer_id:
        return jsonify({'error': 'No active subscription'}), 404
    
    try:
        portal_session = stripe.billing_portal.Session.create(
            customer=business.stripe_customer_id,
            return_url=request.host_url + 'settings',
        )
        
        return jsonify({'url': portal_session.url}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    """Handle Stripe webhook events"""
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({'error': 'Invalid signature'}), 400
    
    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session_data = event['data']['object']
        handle_checkout_completed(session_data)
        
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        handle_subscription_updated(subscription)
        
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        handle_subscription_deleted(subscription)
    
    return jsonify({'status': 'success'}), 200

def handle_checkout_completed(session_data):
    """Handle successful checkout"""
    business_id = session_data['metadata']['business_id']
    plan = session_data['metadata']['plan']
    customer_id = session_data['customer']
    subscription_id = session_data['subscription']
    
    business = Business.query.get(business_id)
    if business:
        business.stripe_customer_id = customer_id
        business.stripe_subscription_id = subscription_id
        business.subscription_tier = plan
        business.monthly_minutes_limit = SUBSCRIPTION_PLANS[plan]['minutes']
        business.subscription_status = 'active'
        db.session.commit()

def handle_subscription_updated(subscription):
    """Handle subscription updates"""
    customer_id = subscription['customer']
    status = subscription['status']
    
    business = Business.query.filter_by(stripe_customer_id=customer_id).first()
    if business:
        business.subscription_status = status
        db.session.commit()

def handle_subscription_deleted(subscription):
    """Handle subscription cancellation"""
    customer_id = subscription['customer']
    
    business = Business.query.filter_by(stripe_customer_id=customer_id).first()
    if business:
        business.subscription_status = 'cancelled'
        db.session.commit()

@payments_bp.route('/subscription-info', methods=['GET'])
@login_required
def get_subscription_info():
    """Get current subscription information"""
    business_id = session.get('business_id')
    business = Business.query.get(business_id)
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    return jsonify({
        'plan': business.subscription_tier,
        'status': business.subscription_status if hasattr(business, 'subscription_status') else 'active',
        'minutes_limit': business.monthly_minutes_limit,
        'minutes_used': business.monthly_minutes_used if hasattr(business, 'monthly_minutes_used') else 0,
        'has_payment_method': business.stripe_customer_id is not None if hasattr(business, 'stripe_customer_id') else False
    }), 200

