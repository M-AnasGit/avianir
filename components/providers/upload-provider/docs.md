# Upload Provider Documentation

## Overview

The `UploadProvider` handles file selection, validation, and URL creation for previewing uploaded files.

## Dependencies

- `React` for state and context management
- `UploadBox` for handling the UI of the upload component

## Context

The `UploadContext` provides file-related states and functions:

- `file`: `File | null` - Stores the uploaded file.
- `fileURL`: `string | null` - Stores the object URL for previewing the file.
- `Component`: `() => React.JSX.Element` - A function that returns the `UploadBox` component.
- `handleDeleteFile`: Removes the uploaded file.

## Provider

### Props

- `children`: `React.ReactNode` - The components that will have access to the upload context.
- `id`: `string` - Unique identifier for the upload field.
- `fileType`: `string` - Specifies the allowed file type.
- `MAX_SIZES`: `Record<string, number>` - Defines the maximum file size per file type.

### State

- `file`: Stores the uploaded file.
- `fileURL`: Stores the object URL for preview.
- `fileError`: Boolean state for file validation errors.

### Functions

- `handleUploadFile(files: FileList | File[] | null)`: Validates and sets the uploaded file.
- `handleDeleteFile()`: Removes the uploaded file and resets errors.

### Usage

```tsx
import UploadProvider from './upload-provider';

<UploadProvider id="file-upload" fileType="image/png" MAX_SIZES={{ image: 5000000 }}>
    <App />
</UploadProvider>;
```

## Hook

The `useUpload` hook provides access to the upload context.

### Usage

```tsx
import { useUpload } from './upload-provider';

const { file, fileURL, handleDeleteFile, Component } = useUpload();
```

If `useUpload` is used outside of `UploadProvider`, an error is thrown.

## File Handling Logic

- `handleUploadFile` ensures the uploaded file does not exceed the specified maximum size.
- If a new file is uploaded, the existing file URL is revoked to free memory.
- `handleDeleteFile` resets the file state and clears any errors.

## Cleanup

- The `useEffect` hook ensures that the object URL is revoked when the component unmounts to prevent memory leaks.
