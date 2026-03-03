# AfterCallPro Code Audit and Migration Plan

This document outlines the findings from a comprehensive code audit of the AfterCallPro application and presents a clear plan to migrate its subscription system from GoHighLevel (GHL) to a self-hosted solution on Render using Stripe.

## 1. Executive Summary

The primary goal is to eliminate the expensive dependency on GoHighLevel ($495/month) by implementing a native subscription and payment system. The audit reveals that the application is well-structured, using a modern Python/Flask backend and a React frontend. The core issue is that the frontend pricing page currently uses hardcoded checkout links pointing to a GHL payment processor (`fastpaydirect.com`).

The migration will involve replacing these external links with a new, in-app checkout flow that communicates directly with the application's own backend. The backend already contains a robust Stripe integration for creating checkout sessions and managing subscriptions via webhooks, but it appears to be either unused or disconnected from the frontend. The deployment configuration on Render also needs to be corrected to ensure the frontend is properly built and served by the Flask backend.

## 2. Codebase Audit Findings

The application is divided into a backend API built with Flask and a frontend single-page application (SPA) built with React.

### Backend (Flask API)

- **Location**: `/src`
- **Framework**: Flask
- **Database**: PostgreSQL with SQLAlchemy ORM.
- **Key Files**:
    - `app.py`: Main Flask application entry point. It correctly initializes the database and registers API blueprints.
    - `src/routes/payments.py`: Contains all necessary backend logic for Stripe integration. This includes creating Stripe Checkout sessions, handling webhooks for subscription events (creation, updates, cancellation), and providing a customer portal for subscription management.
    - `src/models/call.py`: Defines the `Business` model, which correctly includes fields for `stripe_customer_id`, `stripe_subscription_id`, and other subscription-related statuses.
    - `src/routes/auth.py`: Manages user registration and authentication. A `Business` entity is created upon user registration.

### Frontend (React App)

- **Location**: `/src/frontend`
- **Framework**: React with Vite.
- **Key Files**:
    - `src/frontend/src/pages/Pricing.jsx`: **This is the main problem area.** The file contains hardcoded URLs to `fastpaydirect.com` for each subscription plan. This completely bypasses the application's own backend payment logic.
    - `src/frontend/src/AuthProvider.jsx`: Manages user authentication state. It makes API calls to a hardcoded backend URL (`https://aftercallpro.onrender.com`), which will need to be updated for local development and potentially for production.
    - `src/frontend/src/pages/Dashboard.jsx`: This page is currently a placeholder and will need to be built out to display subscription status and provide access to the customer portal.

### Deployment (Render)

- **Configuration**: `render.yaml`, `render-build.sh`
- **Issue**: The `render.yaml` file is configured to run `gunicorn app:app` but its `buildCommand` only installs Python dependencies (`pip install -r requirements.txt`). It does **not** execute the `render-build.sh` script, which is responsible for building the React frontend. As a result, the Flask backend is likely serving an outdated or non-existent frontend, preventing the application from working correctly on Render.

## 3. Identified Gaps and Issues

1.  **External Payment Links**: The use of hardcoded GHL payment links in `Pricing.jsx` is the primary issue preventing an independent subscription system.
2.  **Broken Build Process**: The Render deployment does not build the frontend, meaning any changes to the React code are not being deployed.
3.  **Missing Frontend-Backend Integration for Payments**: The React frontend does not call the backend's `/api/payments/create-checkout-session` endpoint. The UI needs to be updated to trigger this API call.
4.  **Incomplete User Dashboard**: The `Dashboard.jsx` is a placeholder. It needs to be updated to show the user their current subscription status, usage, and provide a link to the Stripe Customer Portal for managing their subscription.
5.  **Missing Environment Variables**: The backend requires several Stripe-related environment variables (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and price IDs for each plan) that are not configured in the repository and will need to be set in the Render environment.

## 4. Proposed Migration and Fixes

The following steps will be taken to migrate the application and fix the identified issues.

1.  **Update Deployment Configuration**: Modify `render.yaml` to execute the `render-build.sh` script as part of the build process. This will ensure the React frontend is built and its static assets are available to be served by the Flask backend.

2.  **Implement In-App Checkout Flow**:
    - Modify `src/frontend/src/pages/Pricing.jsx` to remove the hardcoded `fastpaydirect.com` links.
    - Add a function that, upon clicking a subscription button, sends a `POST` request to the backend's `/api/payments/create-checkout-session` endpoint with the selected plan ID.
    - On receiving a successful response (containing a Stripe session ID), redirect the user to the Stripe Checkout page.

3.  **Enhance the User Dashboard**:
    - Create a new component, `SubscriptionStatus.jsx`, to fetch and display the user's current subscription plan, status, and minute usage from the `/api/payments/subscription-info` backend endpoint.
    - Add a button to the dashboard that calls the `/api/payments/create-customer-portal-session` endpoint and redirects the user to the Stripe Customer Portal, allowing them to manage their billing information and cancel their subscription.
    - Integrate this new component into the main `Dashboard.jsx` page.

4.  **Configure Environment Variables**: The user will be prompted to provide the necessary Stripe API keys and price IDs, which will then be securely configured as environment variables in the Render service.

By completing these steps, AfterCallPro will have a fully functional, self-contained subscription system running on Render, completely independent of GoHighLevel.
