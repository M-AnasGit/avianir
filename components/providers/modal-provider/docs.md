# Modal Provider Documentation

## Overview

The `ModalProvider` provides utility functions for setting and removing modals dynamically.

## Dependencies

- `React` for state and context management
- `Dialog` and `DialogContent` components from `shadcn`

## Context

The `ModalContext` is a React context that provides the modal component and two handler functions:

- `handleSetModal`: Sets a modal component.
- `handleRemoveModal`: Removes the active modal.

## Provider

### Props

- `children`: `React.ReactNode` - The children components that will have access to the modal context.

### State

- `modal`: `React.ReactNode | null` - Stores the current modal component.

### Functions

- `handleSetModal(modal: React.ReactNode)`: Sets the modal state to the provided component.
- `handleRemoveModal()`: Clears the modal state.

### Usage

```tsx
import ModalProvider from './modal-provider';

<ModalProvider>
    <App />
</ModalProvider>;
```

## Hook

The `useModal` hook provides access to the modal context.

### Usage

```tsx
import { useModal } from './modal-provider';

const { handleSetModal, handleRemoveModal } = useModal();
```

If `useModal` is used outside of `ModalProvider`, it throws an error.

## Modal Handling Logic

- When `handleSetModal` is called, the modal state updates with the provided component.
- `handleRemoveModal` clears the modal state.
- The `Dialog` component renders the modal conditionally based on the `modal` state.

## Error Handling

- If `useModal` is used outside of `ModalProvider`, an error is thrown to prevent unintended behavior.
