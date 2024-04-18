```mermaid
flowchart LR;
  A[Start] --> B[Welcome to the RPG game!]
  B --> C[Update location]
  C --> D[Go to town]
  D --> E[Update location]
  E --> F[Go to store]
  F --> G[Update location]
  G --> H[Buy health]
  H --> I[Update location]
  I --> J[Buy weapon]
  J --> K[Update location]
  K --> L[Go back to town]
  L --> C
  C --> M[Go to cave]
  M --> N[Update location]
  N --> O[Fight unknown creature]
  O --> P[Update location]
  P --> Q[Go back to town]
  Q --> C
  C --> R[Fight dragon]
  R --> S[Update location]
  S --> T[Attack]
  T --> U[Update location]
  U --> V[Dodge]
  V --> U
  U --> W[Run]
  W --> X[Update location]
  X --> Y[You die]
  Y --> Z[REPLAY?]
  Z --> D
  T --> AA[You defeat the dragon!]
  AA --> AB[YOU WIN THE GAME!]
  AB --> AC[REPLAY?]
  AC --> D
  V --> AD[You dodge the attack]
  AD --> U
  U --> AE[You hit the monster]
  AE --> U
  AE --> AF[Your weapon breaks]
  AF --> U
  AF --> AG[You defeated the monster]
  AG --> AH[Update location]
  AH --> AI[Go to town]
  AI --> C
  AI --> AJ[Go to town]
  AJ --> C
  AJ --> AK[Go to town]
  AK --> C
