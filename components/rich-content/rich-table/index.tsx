'use client';
import React from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
//@CUSTOM COMPONENTS
import MenuBar from './menu-bar';
//@CONSTANTS
import { table_extensions } from '../constants';
import '../styles.css';
//@TYPES
import { RichTextProps } from '../types';

type Props = RichTextProps & {
    handleSaveContent: (v: string) => void;
};

export default function RichTableInput({ content, style, handleSaveContent }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            ...table_extensions,
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                'data-editable': 'true',
            },
        },
    });

    React.useEffect(() => {
        return () => {
            if (editor) {
                handleSaveContent(editor.getHTML());
            }
        };
    }, [editor, handleSaveContent]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <MenuBar editor={editor} />
            <div
                className="no-scrollbar"
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    overflowX: 'scroll',
                }}
            >
                <EditorContent editor={editor} style={{ ...style, minHeight: '150px' }} />
            </div>
        </>
    );
}
