# Slipify - Clean Architecture Documentation

This document outlines the clean architecture implementation for the Slipify application, following React/Tailwind best practices.

## Architecture Overview

The application follows Clean Architecture principles with clear separation of concerns across different layers:

```
src/
├── domain/                 # Domain Layer (Business Logic)
│   ├── models/            # Domain models and entities
│   ├── types/             # Type definitions and constants
│   └── index.js           # Domain exports
├── application/           # Application Layer (Use Cases)
│   └── services/          # Application services
├── infrastructure/        # Infrastructure Layer (External Concerns)
│   ├── api/              # API clients and external services
│   └── config/           # Configuration
├── presentation/         # Presentation Layer (UI)
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   └── hooks/            # Custom React hooks
└── services/             # Service layer exports
```

## Layer Responsibilities

### 1. Domain Layer (`src/domain/`)
- **Purpose**: Contains business logic and domain models
- **Components**:
  - `models/User.js`: User domain model with validation logic
  - `types/index.js`: Type definitions, constants, and interfaces
- **Dependencies**: None (pure business logic)

### 2. Application Layer (`src/application/`)
- **Purpose**: Contains use cases and application services
- **Components**:
  - `services/UserService.js`: User business logic and orchestration
- **Dependencies**: Domain layer only

### 3. Infrastructure Layer (`src/infrastructure/`)
- **Purpose**: Handles external concerns (API calls, configuration)
- **Components**:
  - `api/ApiClient.js`: HTTP client with retry logic and error handling
  - `api/UserApi.js`: User-specific API operations
  - `config/api.js`: API configuration and environment variables
- **Dependencies**: Domain layer

### 4. Presentation Layer (`src/presentation/`)
- **Purpose**: UI components and user interactions
- **Components**:
  - `components/`: Reusable UI components
  - `pages/`: Page-level components
  - `hooks/`: Custom React hooks for state management

## Component Structure

### Reusable UI Components

#### Layout Components
- **`PageLayout`**: Consistent page structure and background
- **`Card`**: Reusable card container with consistent styling
- **`Header`**: Logo, title, and description layout

#### Form Components
- **`Input`**: Styled input with validation support
- **`FormField`**: Input with label and error handling
- **`Form`**: Form container with submission handling
- **`Alert`**: Success/error message display

### Custom Hooks

#### Form Management
- **`useForm`**: Generic form state management
- **`useUserForm`**: User-specific form with validation
- **`useUser`**: User operations and API calls

## Key Features

### 1. Separation of Concerns
- Business logic isolated in domain layer
- UI logic separated from business logic
- API calls abstracted through service layer

### 2. Reusability
- Components designed for reuse across the application
- Custom hooks for common patterns
- Centralized configuration and constants

### 3. Error Handling
- Comprehensive error handling at all layers
- User-friendly error messages
- Validation at domain and presentation layers

### 4. Type Safety
- Consistent type definitions
- Form field constants
- API response interfaces

## Usage Examples

### Using Components
```jsx
import { PageLayout, Card, Header, FormField, Alert } from '../components';
import { useUserForm } from '../hooks';

function MyPage() {
  const { values, handleChange, handleSubmit, error, success } = useUserForm();
  
  return (
    <PageLayout>
      <Card>
        <Header title="My App" description="Welcome" />
        <Form onSubmit={handleSubmit}>
          <Alert type="error" message={error} />
          <FormField name="email" value={values.email} onChange={handleChange} />
        </Form>
      </Card>
    </PageLayout>
  );
}
```

### Using Services
```jsx
import { userService } from '../services';

const result = await userService.createUser(userData);
if (result.success) {
  // Handle success
} else {
  // Handle error
}
```

## Benefits

1. **Maintainability**: Clear separation makes code easier to maintain
2. **Testability**: Each layer can be tested independently
3. **Scalability**: Easy to add new features without affecting existing code
4. **Reusability**: Components and services can be reused across the application
5. **Consistency**: Standardized patterns and styling throughout

## Development Guidelines

1. **Domain First**: Always start with domain models and business logic
2. **Dependency Direction**: Dependencies should point inward (toward domain)
3. **Single Responsibility**: Each component/service should have one clear purpose
4. **Consistent Naming**: Use consistent naming conventions across layers
5. **Error Handling**: Always handle errors gracefully with user-friendly messages
