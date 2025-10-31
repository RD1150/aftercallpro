# AI After Hours Call Service

This project is a complete AI-powered after-hours call answering service. It provides a web-based dashboard for managing businesses, viewing call history, and configuring the AI assistant. The backend is built with Flask and integrates with Twilio for telephony and OpenAI for conversational AI.

## Features

*   **Multi-tenant Architecture:** Supports multiple businesses with separate configurations.
*   **AI-Powered Call Handling:** Uses OpenAI's GPT-4 to understand and respond to callers.
*   **Twilio Integration:** Manages incoming and outgoing calls using Twilio's Voice API.
*   **Web Dashboard:** A React-based frontend for managing the service.
*   **Call History & Transcripts:** View detailed logs of all calls with full transcripts.
*   **Business & AI Configuration:** Customize greetings, business hours, AI voice, and more.
*   **Analytics:** Monitor call volume, duration, and other key metrics.

## Technical Stack

*   **Backend:** Flask (Python)
*   **Frontend:** React (JavaScript)
*   **Database:** SQLAlchemy with SQLite
*   **Telephony:** Twilio
*   **AI:** OpenAI
*   **Styling:** Tailwind CSS, shadcn/ui

## Prerequisites

*   Python 3.10+
*   Node.js and pnpm
*   Twilio account with a phone number
*   OpenAI API key

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd ai_call_service
    ```

2.  **Set up the backend:**

    *   Create and activate a virtual environment:

        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

    *   Install Python dependencies:

        ```bash
        pip install -r requirements.txt
        ```

3.  **Set up the frontend:**

    *   Install JavaScript dependencies:

        ```bash
        cd src/frontend
        pnpm install
        ```

4.  **Configure environment variables:**

    *   Copy the example `.env` file:

        ```bash
        cp .env.example .env
        ```

    *   Edit the `.env` file and add your API keys and Twilio information:

        ```
        OPENAI_API_KEY=your_openai_api_key_here
        TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
        TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
        TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
        SECRET_KEY=your_secret_key_here
        ```

## Running the Application

1.  **Build the frontend:**

    *   From the `src/frontend` directory, run the build command:

        ```bash
        pnpm run build
        ```

    *   Copy the built files to the backend's static directory:

        ```bash
        cd ../..
        rm -rf src/static/*
        cp -r src/frontend/dist/* src/static/
        ```

2.  **Start the backend server:**

    *   From the root directory of the project, run the Flask app:

        ```bash
        source venv/bin/activate
        python src/main.py
        ```

3.  **Access the application:**

    *   Open your web browser and navigate to `http://localhost:5000`.

## API Endpoints

### Business

*   `GET /api/businesses`: Get all businesses
*   `GET /api/businesses/<id>`: Get a specific business
*   `POST /api/businesses`: Create a new business
*   `PUT /api/businesses/<id>`: Update a business
*   `DELETE /api/businesses/<id>`: Delete a business
*   `GET /api/businesses/<id>/calls`: Get all calls for a business
*   `GET /api/businesses/<id>/stats`: Get statistics for a business

### Voice (Twilio Webhooks)

*   `POST /api/voice/incoming`: Handle incoming calls
*   `POST /api/voice/process`: Process caller speech
*   `POST /api/voice/status`: Receive call status updates

# Force deployment Fri Oct 31 03:52:07 EDT 2025
