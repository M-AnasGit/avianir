# ErrorBoundary Documentation

## Overview

The `ErrorBoundary` component is a React class component that catches JavaScript errors in its child components, logs them, and displays a fallback UI to prevent the entire application from crashing.

## Dependencies

- `React` for component lifecycle management.
- `Button` component from `./ui/button` for user interaction.

## Props

- `children`: `ReactNode` - The child components wrapped inside `ErrorBoundary`.

## State

- `hasError`: `boolean` - Determines whether an error has been caught.
    - `true`: Displays the fallback UI.
    - `false`: Renders child components normally.

## Lifecycle Methods

### `static getDerivedStateFromError(_: Error): ErrorBoundaryState`

- Catches errors thrown by child components and updates the state (`hasError: true`), triggering a re-render to show the fallback UI.

### `componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void`

- Logs the error and error details to the console for debugging.

## Behavior

- If an error occurs in any child component, `ErrorBoundary` updates its state to `hasError: true`.
- It then renders an error message and a retry button.
- Clicking **Try Again?** resets the state (`hasError: false`), attempting to render child components again.

## Usage

```tsx
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>
```

## Error Handling

- Prevents the app from crashing due to uncaught errors in child components.
- Logs errors for debugging.
- Provides a retry mechanism for users to attempt reloading the affected component.
