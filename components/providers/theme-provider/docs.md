# Theme Provider Documentation

## Overview

The `ThemeProvider` component is a wrapper around `next-themes` that provides theme management capabilities across the application.

## Dependencies

- `React` for rendering and component logic
- `next-themes` for theme switching functionality

## Provider

### Props

- `children`: `React.ReactNode` - The children components that will have access to theme settings.
- `...props`: Additional props forwarded to `NextThemesProvider`.

### Usage

```tsx
import { ThemeProvider } from './theme-provider';

<ThemeProvider>
    <App />
</ThemeProvider>;
```

## Functionality

- Wraps the application with `NextThemesProvider` to enable theme switching.
- Spreads additional props onto `NextThemesProvider` for customization.

## Error Handling

- Ensures that all children components have access to the theme context.
- Passes all valid props to `NextThemesProvider` without modification.
