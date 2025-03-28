'use client';
import React from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
//@CONSTANTS
import { text_extensions, table_extensions } from './constants';
//@TYPES
import { RichTextProps } from './types';

export default function RichContent({ content, style }: RichTextProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            ...text_extensions,
            ...table_extensions,
        ],
        content,
        editable: false,
        immediatelyRender: false,
    });

    React.useEffect(() => {
        if (editor) {
            setTimeout(() => {
                editor.commands.setContent(content);
            });
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    return <EditorContent editor={editor} style={style} />;
}
