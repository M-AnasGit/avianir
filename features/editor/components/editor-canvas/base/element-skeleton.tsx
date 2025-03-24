'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import ContextMenuWrapper from '@/features/editor/context-menu-wrapper';
import ElementIndicator from './insert-indicator';
import ElementFactory from './element-factory';
//@SHADCNUI
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
//@CUSTOM HOOK
import { useEditor } from '@/features/editor/provider';
import { useCanvas } from '../provider';
//@HELPERS
import { calculateInsertPosition } from '../helpers';
//@TYPES
import { EditorElement, ElementTypes } from '@/features/editor/types';

const THROTTLE_TIME = 200;

type Props = {
    index: number;
    ele: EditorElement;
    flexDirection: React.CSSProperties['flexDirection'] | undefined;
};

export default function ElementSkeleton({ index, ele, flexDirection }: Props) {
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
    const style = React.useMemo(() => stylePerDevice[state.editor.device], [stylePerDevice, state.editor.device]);

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
            let element = ElementFactory.createElement(dropped_type);
            if (!element) return;
            if (current_preset) {
                element = {
                    ...element,
                    stylePerDevice: current_preset.stylePerDevice,
                    globalStyle: current_preset.globalStyle,
                    preset: current_preset.name,
                    formContent: current_preset.formContent,
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
        if (draggedType !== 'input' && draggedType !== 'radio' && draggedType !== 'checkbox') {
            if (type === 'container' && hoveredElement !== e.currentTarget)
                handleHoverElement(e.currentTarget as HTMLElement);
        } else {
            if (type === 'form' && hoveredElement !== e.currentTarget)
                handleHoverElement(e.currentTarget as HTMLElement);
        }
    };
    const lastExecutionTime = React.useRef<number | null>(null);
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hoveredElement || hoveredElement !== e.currentTarget) return;
        const container = Array.from(e.currentTarget.children).find((child) =>
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
            <ElementIndicator id={id} index={index} flexDirection={flexDirection} canvasRef={canvasRef} />
            <ContextMenuWrapper ele={ele} allowed={new Set(ele.id !== '_body' ? ['*'] : ['paste', 'rename'])}>
                <div
                    data-position={index}
                    id={id}
                    ref={canvasRef}
                    className={clsx('relative cursor-grab transition-all', {
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
                    }}
                    onClick={(e: React.MouseEvent) => handleSelect(e, id)}
                    draggable={id !== '_body' && !state.editor.preview}
                    onDragStart={(e: React.DragEvent) => handleDragStart(e, id, type)}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={(e: React.DragEvent) => handleDrop(e)}
                >
                    {ElementFactory.renderElement(ele, state.editor.device)}
                    {state.editor.selectedElementId === id && !state.editor.preview && (
                        <Badge className="absolute -left-[1px] -top-[22px] truncate rounded-none !rounded-t-lg">
                            {name}
                        </Badge>
                    )}
                </div>
            </ContextMenuWrapper>

            <ElementIndicator id={id} index={index + 1} flexDirection={flexDirection} canvasRef={canvasRef} />
        </>
    );
}
