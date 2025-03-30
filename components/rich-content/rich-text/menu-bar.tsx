'use client';
import React from 'react';
import { Editor } from '@tiptap/react';
//@CUSTOM COMPONENTS
import RichTextColorInput from './menu-components/rich-text-color-input';
import LinkInput from './menu-components/link-input';
//@SHADCNUI
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SelectWithSearch } from '@/components/ui/select-with-search';
//@LUICDE REACT
import {
    BoldIcon,
    Code,
    Eraser,
    ItalicIcon,
    Link,
    List,
    ListOrdered,
    PaintBucket,
    Quote,
    SquareRadical,
    Strikethrough,
    Underline,
} from 'lucide-react';
//@CONSTANTS
import { languages } from '../constants';

type Props = {
    editor: Editor;
    palette: Palette;
};

export default function MenuBar({ editor, palette }: Props) {
    const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(null);
    const handleSelectLanguage = (newVal: string) => {
        setSelectedLanguage(newVal);
    };
    React.useEffect(() => {
        if (editor && selectedLanguage && selectedLanguage !== editor.getAttributes('codeBlock').language) {
            editor.chain().focus().setNode('codeBlock', { language: selectedLanguage }).run();
        }
    }, [selectedLanguage]);

    const [selectedInput, setSelectedInput] = React.useState<'color' | 'link' | null>(null);
    const handleSelectInput = (newVal: 'color' | 'link' | null) => {
        if (editor && (editor?.isActive('codeBlock') || !editor.state.selection || editor.state.selection.empty)) {
            return;
        }

        setSelectedInput(newVal);
    };
    React.useEffect(() => {
        if (editor && (editor?.isActive('codeBlock') || !editor.state.selection || editor.state.selection.empty)) {
            setSelectedInput(null);
            const currentLanguage = editor.getAttributes('codeBlock').language;
            if (currentLanguage) {
                setSelectedLanguage(currentLanguage);
            }
        }
    }, [editor, editor?.state.selection]);

    const buttons = React.useMemo(() => {
        return {
            bold: {
                icon: <BoldIcon />,
                action: () => editor.chain().focus().toggleBold().run(),
                pressed: editor.isActive('bold'),
            },
            italic: {
                icon: <ItalicIcon />,
                action: () => editor.chain().focus().toggleItalic().run(),
                pressed: editor.isActive('italic'),
            },
            strike: {
                icon: <Strikethrough />,
                action: () => editor.chain().focus().toggleStrike().run(),
                pressed: editor.isActive('strike'),
            },
            under: {
                icon: <Underline />,
                action: () => editor.chain().focus().toggleUnderline().run(),
                pressed: editor.isActive('underline'),
            },
            color: {
                icon: <PaintBucket />,
                action: () => handleSelectInput(selectedInput === 'color' ? null : 'color'),
                pressed: false,
            },
            link: {
                icon: <Link />,
                action: () =>
                    editor.isActive('link')
                        ? editor.chain().focus().unsetLink().run()
                        : handleSelectInput(selectedInput === 'link' ? null : 'link'),
                pressed: editor.isActive('link'),
            },
            code: {
                icon: <Code />,
                action: () =>
                    editor.isActive('codeBlock')
                        ? editor.chain().focus().toggleCodeBlock().run()
                        : editor
                              .chain()
                              .focus()
                              .setCodeBlock()
                              .setNode('codeBlock', {
                                  language: selectedLanguage,
                              })
                              .run(),
                pressed: editor.isActive('codeBlock'),
            },
            blockquote: {
                icon: <Quote />,
                action: () => editor.chain().focus().toggleBlockquote().run(),
                pressed: editor.isActive('blockquote'),
            },
            'bullet list': {
                icon: <List />,
                action: () => editor.chain().focus().toggleBulletList().run(),
                pressed: editor.isActive('bulletList'),
            },
            'ordered list': {
                icon: <ListOrdered />,
                action: () => editor.chain().focus().toggleOrderedList().run(),
                pressed: editor.isActive('orderedList'),
            },
            maths: {
                icon: <SquareRadical />,
                action: () =>
                    editor.chain().focus().insertContent('<span data-math formula="\\frac{a}{b}"></span>').run(),
                pressed: false,
            },
            eraser: {
                icon: <Eraser />,
                action: () => {
                    editor.chain().focus().unsetAllMarks().run();
                    editor.chain().focus().clearNodes().run();
                },
                pressed: false,
            },
        };
    }, [editor, editor?.state.selection, selectedLanguage]);

    const handleColorChange = (color: string) => {
        if (color === 'default') {
            editor.chain().focus().unsetColor().run();
        } else {
            editor.chain().focus().setColor(color).run();
        }
    };

    return (
        <div className="control-group bg-background text-muted-foreground">
            <div className="flex flex-wrap gap-2">
                {buttons &&
                    Object.entries(buttons).map(([key, { icon, action, pressed }]) => (
                        <Tooltip key={key}>
                            <TooltipTrigger>
                                <Toggle asChild pressed={!!pressed} onClick={action} data-testid={`menu-bar-${key}`}>
                                    {icon}
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent className="capitalize">{key}</TooltipContent>
                        </Tooltip>
                    ))}
            </div>
            <div
                className="px-1 pt-2"
                data-testid="menu-bar-inputs"
                data-current={selectedInput ? selectedInput : editor.isActive('codeBlock') && 'code'}
            >
                {selectedInput === 'color' && (
                    <RichTextColorInput
                        currentColor={editor.getAttributes('textStyle').color || 'default'}
                        palette={palette}
                        handleColorChange={handleColorChange}
                    />
                )}
                {selectedInput === 'link' && (
                    <LinkInput
                        link={editor.getAttributes('link').href || ''}
                        action={(newLink) => {
                            editor.chain().focus().setLink({ href: newLink }).run();

                            setSelectedInput(null);
                        }}
                    />
                )}
                {editor.isActive('codeBlock') && (
                    <SelectWithSearch
                        data={languages}
                        value={selectedLanguage || ''}
                        handleValueChange={handleSelectLanguage}
                    />
                )}
            </div>
        </div>
    );
}
