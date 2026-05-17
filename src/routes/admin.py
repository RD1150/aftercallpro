"""
Admin routes
============
Operator-only endpoints. Used to manually provision Twilio numbers for
comped / free accounts that never go through Stripe checkout (the normal
provisioning path runs on the `checkout.completed` webhook).

Every route here is gated on the logged-in user having role == 'admin'.
"""

from functools import wraps
from flask import Blueprint, request, jsonify, session

from src.models.call import db, Business
from src.models.user import User

admin_bp = Blueprint('admin', __name__)

# Comped accounts default to the Core plan's minute allowance.
COMP_DEFAULT_TIER = 'core'
COMP_DEFAULT_MINUTES = 1500


def require_admin(fn):
    """Allow the request only if the session belongs to an admin user."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401
        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper


def _business_summary(b):
    return {
        'id': b.id,
        'name': b.name,
        'email': b.email,
        'phone_number': b.phone_number,
        'twilio_number': b.twilio_number,
        'twilio_number_provisioned': b.twilio_number_provisioned,
        'subscription_tier': b.subscription_tier,
        'subscription_status': b.subscription_status,
        'founding_member': b.founding_member,
    }


@admin_bp.route('/businesses', methods=['GET'])
@require_admin
def list_businesses():
    """List businesses, optionally filtered by a name/email/phone substring."""
    search = (request.args.get('search') or '').strip()
    query = Business.query
    if search:
        like = f'%{search}%'
        query = query.filter(
            db.or_(
                Business.name.ilike(like),
                Business.email.ilike(like),
                Business.phone_number.ilike(like),
            )
        )
    businesses = query.order_by(Business.created_at.desc()).limit(100).all()
    return jsonify({'businesses': [_business_summary(b) for b in businesses]}), 200


@admin_bp.route('/businesses/<int:business_id>/provision-number', methods=['POST'])
@require_admin
def manual_provision_number(business_id):
    """Manually buy and assign a Twilio number to a business.

    Body (all optional):
      area_code: 3-digit area code to prefer (defaults to the business phone's).
      comp:      if true, also mark the account active so it can take calls
                 without going through Stripe.
    """
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404

    data = request.get_json(silent=True) or {}
    comp = bool(data.get('comp'))

    # If they ask to comp the account, flip it active before/after either way.
    if comp:
        business.subscription_status = 'active'
        if not business.subscription_tier or business.subscription_tier == 'starter':
            business.subscription_tier = COMP_DEFAULT_TIER
            business.monthly_minutes_limit = COMP_DEFAULT_MINUTES

    # Already has a number — don't buy a second one. Commit any comp change.
    if business.twilio_number:
        db.session.commit()
        return jsonify({
            'status': 'already_provisioned',
            'business': _business_summary(business),
        }), 200

    area_code = data.get('area_code')
    if not area_code:
        biz_phone = business.phone_number or ''
        area_code = biz_phone.lstrip('+').lstrip('1')[:3] or None

    try:
        from src.services.twilio_provisioning import provision_number_for_business
        result = provision_number_for_business(business, area_code=area_code)
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Provisioning raised an exception: {e}'}), 502

    if not result.get('success'):
        db.session.rollback()
        return jsonify({'error': result.get('error') or 'Provisioning failed'}), 502

    business.twilio_number = result['phone_number']
    business.twilio_number_sid = result['sid']
    business.twilio_number_provisioned = True
    db.session.commit()

    return jsonify({
        'status': 'provisioned',
        'business': _business_summary(business),
    }), 200
