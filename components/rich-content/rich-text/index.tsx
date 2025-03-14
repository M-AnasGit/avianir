'use client';
import React from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
//@CUSTOM COMPONENTS
import MenuBar from './menu-bar';
//@CONSTANTS
import { text_extensions } from '../constants';
import '../styles.css';
//@TYPES
import { RichTextProps } from '../types';

type Props = RichTextProps & {
    palette: Palette;
    handleSaveContent: (v: string) => void;
};

export default function RichTextInput({ content, style, palette, handleSaveContent }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            ...text_extensions,
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
            <MenuBar palette={palette} editor={editor} />
            <div
                className="no-scrollbar"
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                }}
            >
                <EditorContent editor={editor} style={{ ...style, minHeight: '150px' }} data-testid="rich-content" />
            </div>
        </>
    );
}
