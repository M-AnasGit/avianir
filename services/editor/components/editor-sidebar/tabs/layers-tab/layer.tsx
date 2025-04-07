'use client';
import React from 'react';
import ContextMenuWrapper from '@/services/editor/context-menu-wrapper';
//@LUCIDE ICONS
import { Eye, EyeClosed, GripVertical, ScanEye } from 'lucide-react';
//@CONSTANTS
import { COMPONENTS_TAB_ITEMS } from '../constants';
import { COMPONENTS_TYPES_ICONS } from '@/services/editor/constants';
//@CUSTOM HOOKS
import { useEditor } from '@/services/editor/provider';
//@TYPES
import { EditorElement } from '@/services/editor/types';

type Props = {
    ele: EditorElement;
    handleChangeContainer: (id: string) => void;
};

export default function Layer({ ele, handleChangeContainer }: Props) {
    const { state, dispatch } = useEditor();

    const Icon = React.useMemo(
        () =>
            COMPONENTS_TYPES_ICONS[
                Object.values(COMPONENTS_TAB_ITEMS)
                    .flat()
                    .find((item) => item.type === ele.type)?.type ?? 'text'
            ] || Eye,
        [ele.type],
    );
    const selected = React.useMemo(
        () => state.editor.selectedElementId === ele.id,
        [state.editor.selectedElementId, ele.id],
    );
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

    const [visible, setVisible] = React.useState<boolean>(true);
    const handleVisible = () => {
        setVisible(!visible);
        handleDisplayElement(ele.id);
    };

    return (
        <ContextMenuWrapper ele={ele} allowed={new Set(['*'])}>
            <div
                id={`layer-${ele.id}`}
                className="flex items-center justify-between gap-2 rounded-md border-b-2 bg-muted px-2 py-3 text-muted-foreground data-[selected=true]:ring-2"
                role="button"
                tabIndex={0}
                aria-selected={selected}
                data-selected={selected}
                onClick={() => handleSelect(ele.id)}
                onDoubleClick={() => selected && handleChangeContainer(ele.id)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelect(ele.id);
                }}
            >
                <GripVertical size={16} />
                <span className="flex w-[150px] select-none items-center justify-start gap-3">
                    <Icon className="!size-4 flex-shrink-0 text-muted-foreground" />
                    <p className="truncate text-sm" aria-label={ele.name}>
                        {ele.name}
                    </p>
                </span>
                <button
                    className="mr-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                    onClick={() => selected && handleVisible()}
                    tabIndex={0}
                    data-active={visible}
                    aria-pressed={visible}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleVisible();
                    }}
                >
                    {visible ? <ScanEye size={16} /> : <EyeClosed size={16} />}
                </button>
            </div>
        </ContextMenuWrapper>
    );
}
