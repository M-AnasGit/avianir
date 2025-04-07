'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import ContextMenuWrapper from '@/services/editor/context-menu-wrapper';
import ElementIndicator from './insert-indicator';
//@SHADCNUI
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
//@CUSTOM HOOK
import { useEditor } from '@/services/editor/provider';
import { useCanvas } from '../provider';
//@HELPERS
import { calculateInsertPosition, createElement, fillPresetWithId } from '../helpers';
//@TYPES
import { EditorElement, ElementTypes } from '@/services/editor/types';
import { useUser } from '@/services/user/provider';

const THROTTLE_TIME = 200;

type Props = React.PropsWithChildren & {
    index: number;
    ele: EditorElement;
    flexDirection: React.CSSProperties['flexDirection'] | undefined;
};

export default function BaseElement({ children, index, ele, flexDirection }: Props) {
    const { state, dispatch, presets } = useEditor();
    const {
        insertPosition,
        hanldeChangeInsertPosition,
        hoveredElement,
        handleHoverElement,
        dragRef,
        handleDragRef,
        draggedType,
        handleDraggedType,
    } = useCanvas();
    const { id, type, name, stylePerDevice } = ele;
    const { downloadMedia } = useUser();

    const style = React.useMemo(() => stylePerDevice[state.editor.device], [stylePerDevice, state.editor.device]);

    const [url, setUrl] = React.useState<string | null>(null);
    React.useEffect(() => {
        const fetchDownload = async (src: string) => {
            const url = await downloadMedia(src);

            if (url) {
                setUrl(url);
            } else {
                console.error('Error while fetching media');
            }
        };

        if (style.backgroundImage) {
            fetchDownload(style.backgroundImage);
        } else {
            setUrl(null);
        }
    }, [style.backgroundImage]);

    const handleSelect = React.useCallback(
        (e: React.MouseEvent, id: string) => {
            e.stopPropagation();
            dispatch({
                type: 'CHANGE_CLICKED_ELEMENT',
                payload: { elementId: id },
            });
        },
        [dispatch],
    );
    const handleDragStart = (e: React.DragEvent, id: string, type: ElementTypes) => {
        if (id === '_body') return;
        e.stopPropagation();
        e.dataTransfer.setData('type', type);
        e.dataTransfer.setData('id', id);
        e.dataTransfer.setData('moving', 'true');

        handleDragRef(id, true);
        handleDraggedType(type);
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const containerId = hoveredElement?.id;
        const dropped_type = e.dataTransfer.getData('type') as ElementTypes;
        const id = e.dataTransfer.getData('id') || '';

        const preset_name = e.dataTransfer.getData('preset') || '';
        const current_preset = presets.find((p) => p.name === preset_name);

        const position = insertPosition?.position;
        if (!containerId || position === null || position === undefined) return;

        if (state.editor.elementsMap.has(id)) {
            dispatch({
                type: 'MOVE_ELEMENT',
                payload: {
                    elementId: id,
                    containerId,
                    position,
                },
            });
        } else {
            let element = createElement(dropped_type);
            if (!element) return;
            if (current_preset) {
                element = {
                    ...element,
                    ...fillPresetWithId(current_preset),
                    preset: current_preset.name,
                };
            }
            dispatch({
                type: 'ADD_ELEMENT',
                payload: {
                    elementDetails: element,
                    containerId,
                    position,
                },
            });
        }

        lastExecutionTime.current = null;
        handleDragRef();
        if (hoveredElement) handleHoverElement(null);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (type !== 'form' && type !== 'container' && hoveredElement !== e.currentTarget) return;

        if (draggedType === 'input' || draggedType === 'radio' || draggedType === 'checkbox') {
            if (type === 'form') {
                handleHoverElement(e.currentTarget as HTMLDivElement);
            }
        } else {
            if (draggedType !== 'form' || type !== 'form') {
                handleHoverElement(e.currentTarget as HTMLDivElement);
            }
        }
    };
    const lastExecutionTime = React.useRef<number | null>(null);
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hoveredElement) return;
        const container = Array.from(hoveredElement.children).find((child) =>
            child.getAttribute('data-property')?.includes('container'),
        );
        if (!container) return;
        const children = container.getAttribute('data-property')?.includes('form')
            ? Array.from(Array.from(container.children).find((child) => child.id === 'form-elements')?.children || [])
            : Array.from(container.children);
        const now = Date.now();
        if (lastExecutionTime.current !== null && now - lastExecutionTime.current < THROTTLE_TIME) {
            return;
        }
        lastExecutionTime.current = now;

        const elementId = dragRef?.current || undefined;
        const clientMouse = flexDirection?.includes('row') ? e.clientX : e.clientY;
        const { id, position } =
            calculateInsertPosition(
                Array.from(children),
                clientMouse,
                flexDirection?.includes('row') ? 'x' : 'y',
                elementId,
            ) || {};

        hanldeChangeInsertPosition({
            id: id || hoveredElement?.id,
            position: position || 0,
        });
    };

    const canvasRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <ElementIndicator
                id={id}
                index={index}
                flexDirection={flexDirection}
                hoveredElement={hoveredElement}
                insertPosition={insertPosition}
                canvasRef={canvasRef}
            />
            <ContextMenuWrapper ele={ele} allowed={new Set(ele.id !== '_body' ? ['*'] : ['paste', 'rename'])}>
                <div
                    data-position={index}
                    id={id}
                    ref={canvasRef}
                    className={clsx('relative cursor-grab p-1 transition-all', {
                        'border border-transparent': !state.editor.preview,
                        'border-solid !border-blue-500': state.editor.selectedElementId === id,
                        'border-solid !border-yellow-500': hoveredElement?.id === id,
                        'border-dashed !border-slate-300':
                            state.editor.selectedElementId !== id && type === 'container' && id !== '_body',
                    })}
                    style={{
                        width: style.width,
                        height: style.height,
                        textAlign: style.textAlign,

                        marginTop: style.marginTop,
                        marginRight: style.marginRight,
                        marginBottom: style.marginBottom,
                        marginLeft: style.marginLeft,

                        backgroundImage: `url(${url})`,
                        backgroundRepeat: style.backgroundRepeat,
                        backgroundPosition: style.backgroundPosition,
                        objectFit: style.objectFit,
                    }}
                    onClick={(e: React.MouseEvent) => handleSelect(e, id)}
                    draggable={id !== '_body' && !state.editor.preview}
                    onDragStart={(e: React.DragEvent) => handleDragStart(e, id, type)}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={(e: React.DragEvent) => handleDrop(e)}
                >
                    {children}
                    {state.editor.selectedElementId === id && !state.editor.preview && (
                        <Badge className="absolute -left-[1px] -top-[22px] truncate rounded-none !rounded-t-lg">
                            {name}
                        </Badge>
                    )}
                </div>
            </ContextMenuWrapper>

            <ElementIndicator
                id={id}
                index={index + 1}
                flexDirection={flexDirection}
                hoveredElement={hoveredElement}
                insertPosition={insertPosition}
                canvasRef={canvasRef}
            />
        </>
    );
}
