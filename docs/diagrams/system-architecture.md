graph TB
subgraph Client ["Frontend (React)"]
A[Login Component] --> B[OAuth2Callback]
B --> C[SurveyDesigner]
D[ChatBot Component]
end

    subgraph Server ["Backend (Express)"]
        E[Auth Routes] --> F[Passport Google OAuth]
        G[Chat API] --> H[HuggingFace Integration]
        I[Session Management]
    end

    subgraph External ["External Services"]
        J[Google OAuth]
        K[HuggingFace API]
    end

    %% Client to Server connections
    A --> E
    B --> E
    D --> G

    %% Server to External connections
    F --> J
    H --> K

    %% Session flow
    E --> I
    G --> I

    style Client fill:#f0f0f0,stroke:#333,stroke-width:2px
    style Server fill:#e6f3ff,stroke:#333,stroke-width:2px
    style External fill:#f9f9f9,stroke:#333,stroke-width:2px
