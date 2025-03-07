'use client';
import React from 'react';
//@LUCIDE ICONS
import { ChevronDown, Eye, EyeClosed } from 'lucide-react';
//@CONSTANTS
import { COMPONENTS_TAB_ITEMS, COMPONENTS_TYPES_ICONS } from '../../constants';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
//@TYPES
import { EditorElement } from '@/features/editor/types';
type Props = {
    ele: EditorElement;
};

export default function Layer({ ele }: Props) {
    const { state, dispatch } = useEditor();

    const handleSelect = (id: string) => {
        dispatch({
            type: 'CHANGE_CLICKED_ELEMENT',
            payload: { elementId: id },
        });
    };
    const handleDisplayElement = (id: string) => {
        const element = document.getElementById(id);

        if (element) {
            element.classList.toggle('!opacity-0');
        }
    };

    const nameRef = React.useRef<HTMLParagraphElement>(null);
    const handleUpdateElement = () => {
        if (!nameRef.current) return;

        const newName = nameRef.current.textContent?.trim() || '';

        if (newName !== ele.name.trim()) {
            dispatch({
                type: 'UPDATE_ELEMENT',
                payload: {
                    elementDetails: {
                        ...ele,
                        name: newName,
                    },
                },
            });
        }
    };

    const selected = React.useMemo(() => state.editor.selectedElementId === ele.id, [state.editor.selectedElementId]);
    const Icon = React.useMemo(
        () =>
            COMPONENTS_TYPES_ICONS[
                COMPONENTS_TAB_ITEMS['default'].find((item) => item.type === ele.type)?.type ?? 'text'
            ] || Eye,
        [ele.type],
    );

    const [visible, setVisible] = React.useState<boolean>(true);
    const handleVisible = () => {
        setVisible((prev) => !prev);
        handleDisplayElement(ele.id);
    };

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div
                className={`flex w-full items-center border-b-2`}
                role="button"
                tabIndex={0}
                aria-selected={selected}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelect(ele.id);
                }}
            >
                <button
                    className="mr-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                    onClick={handleVisible}
                    tabIndex={0}
                    data-active={visible}
                    aria-pressed={visible}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleVisible();
                    }}
                >
                    {visible ? <Eye size={16} /> : <EyeClosed size={16} />}
                </button>
                <div className="flex min-w-0 flex-1 items-center gap-2 border-l-2 py-3 pl-3 pr-[1px]">
                    <span className="flex min-w-0 flex-1 items-center gap-3" onClick={() => handleSelect(ele.id)}>
                        <Icon className="!size-4 flex-shrink-0 text-muted-foreground" />
                        <p
                            className={`truncate text-sm ${selected ? 'whitespace-normal break-words' : ''}`}
                            contentEditable={selected}
                            suppressContentEditableWarning
                            aria-label={ele.name}
                            ref={nameRef}
                            onBlur={handleUpdateElement}
                        >
                            {ele.name}
                        </p>
                    </span>
                    {ele.type === 'container' && (
                        <button
                            className="shrink-0 cursor-pointer rounded-md [&[data-state=open]>svg]:rotate-180"
                            tabIndex={0}
                            data-state={isOpen ? 'open' : 'closed'}
                            onClick={handleOpen}
                        >
                            <ChevronDown
                                size={16}
                                className="cursor-pointer text-muted-foreground transition-transform duration-200"
                            />
                        </button>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className="pl-4">
                    {Array.isArray(ele.content) && ele.content.map((ele, i) => <Layer key={i} ele={ele} />)}
                </div>
            )}
        </>
    );
}
