# Rich Text Documentation

## Overview

The rich text components provide a flexible and extensible text editing experience using `tiptap`. The implementation includes three primary components:

- `RichContent` for displaying rich text.
- `RichTextInput` for editable rich text input.
- `RichTableInput` for table-based rich text input.

## Dependencies

- `React` for state management.
- `tiptap` for rich text editing.
- `StarterKit` from `@tiptap/starter-kit` as the base extension.
- `EditorContent` and `useEditor` from `@tiptap/react`.

## Components

### 1. RichContent

#### Props

- `content`: `string` - The initial content to display.
- `style`: `React.CSSProperties` Custom styles for the content.

#### Behavior

- Uses `useEditor` to initialize an editor instance.
- Configures `StarterKit` with `codeBlock` disabled.
- Updates content dynamically when `content` prop changes.
- Renders `EditorContent` for displaying the content.

#### Usage

```tsx
<RichContent content="<p>Hello, world!</p>" />
```

---

### 2. RichTextInput

#### Props

- `content`: `string` - The initial content to display.
- `style`: `React.CSSProperties` Custom styles for the editor.
- `palette`: `Palette` - A theme palette for UI styling.
- `handleSaveContent`: `(v: string) => void` - Function to handle content save.

#### Behavior

- Initializes `useEditor` with `StarterKit` and `text_extensions`.
- Enables an editable rich text input.
- Includes a `MenuBar` component for formatting options.
- Automatically saves content changes when the editor unmounts.
- Applies scroll behavior with a height constraint of `300px`.

#### Usage

```tsx
<RichTextInput content="<p>Editable content</p>" handleSaveContent={saveHandler} palette={themePalette} />
```

---

### 3. RichTableInput

#### Props

- `content`: `string` - The initial content to display.
- `style`: `React.CSSProperties` Custom styles for the editor.
- `handleSaveContent`: `(v: string) => void` - Function to handle content save.

#### Behavior

- Uses `useEditor` with `StarterKit` and `table_extensions`.
- Enables an editable table-based rich text input.
- Includes a `MenuBar` for formatting options.
- Saves content changes on unmount.
- Allows horizontal scrolling for table content.

#### Usage

```tsx
<RichTableInput content="<table>...</table>" handleSaveContent={saveHandler} />
```

## Error Handling

- If `useEditor` fails to initialize, the component returns `null` to prevent rendering issues.
- Content updates are handled inside `React.useEffect` to avoid state inconsistencies.
- `handleSaveContent` ensures content persistence when the editor unmounts.
