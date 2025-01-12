# SurveyApp

This is my first app using AI tools

## System Architecture

![System Architecture](docs/diagrams/system-architecture.png)

### Components

#### Frontend (React)

- Login Component: Handles user authentication
- OAuth2Callback: Processes OAuth authentication response
- SurveyDesigner: Main application interface
- ChatBot Component: AI-powered chat interface

#### Backend (Express)

- Auth Routes: Authentication endpoints
- Passport Google OAuth: OAuth 2.0 implementation
- Chat API: Chat message processing
- Session Management: User session handling

#### External Services

- Google OAuth: Authentication provider
- HuggingFace API: AI model provider
