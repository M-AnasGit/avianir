'use client';
import React from 'react';
import RenderElementComponent from './render-element';
//@CUSTOM HOOK
import { useEditor } from '@/services/editor/provider';
//@TYPES
import { EditorElement, ElementTypes } from '@/services/editor/types';
import { InsertPositionType } from './types';

type CanvasProviderContextType = {
    hoveredElement: HTMLElement | null;
    insertPosition: InsertPositionType | null;
    dragRef: React.RefObject<string | null>;
    draggedType: ElementTypes | null;
    hanldeChangeInsertPosition: (newPosition: InsertPositionType | null) => void;
    handleHoverElement: (element: HTMLElement | null) => void;
    handleUpdateContent: (content: EditorElement['content']) => void;
    handleDragRef: (id?: string, moving?: boolean) => void;
    handleDraggedType: (type: ElementTypes | null) => void;
};

const CanvasProviderContext = React.createContext<CanvasProviderContextType | undefined>(undefined);

const CanvasProvider = ({ elements }: { elements: EditorElement[] }) => {
    const { state, dispatch, componentDragged, draggedType } = useEditor();

    const handleUpdateContent = React.useCallback(
        (content: EditorElement['content']) => {
            if (!state.editor.selectedElement) return;

            dispatch({
                type: 'UPDATE_ELEMENT',
                payload: {
                    elementDetails: {
                        ...state.editor.selectedElement,
                        content: {
                            ...state.editor.selectedElement.content,
                            ...content,
                        },
                    },
                },
            });
        },
        [state.editor.selectedElement?.content, dispatch],
    );

    const [hoveredElement, setHoveredElement] = React.useState<HTMLElement | null>(null);
    const handleHoverElement = React.useCallback((element: HTMLElement | null) => {
        setHoveredElement(element);
    }, []);

    React.useEffect(() => {
        handleHoverElement(componentDragged);
    }, [componentDragged]);

    const [insertPosition, setInsertPosition] = React.useState<InsertPositionType | null>(null);
    const hanldeChangeInsertPosition = React.useCallback((newPosition: InsertPositionType | null) => {
        setInsertPosition(newPosition);
    }, []);

    React.useEffect(() => {
        if (!hoveredElement) setInsertPosition(null);
    }, [hoveredElement]);

    const dragRef = React.useRef<string | null>(null);
    const handleDragRef = React.useCallback((id?: string) => {
        if (!id) return (dragRef.current = null);
        dragRef.current = id;
    }, []);

    const canvasDraggedType = React.useRef<ElementTypes | null>(draggedType);
    const handleDraggedType = React.useCallback((type: ElementTypes | null) => {
        canvasDraggedType.current = type;
    }, []);
    React.useEffect(() => {
        if (draggedType) canvasDraggedType.current = draggedType;
    }, [draggedType]);

    const flexDirection = React.useMemo(() => {
        return state.editor.elements[0].stylePerDevice[state.editor.device].flexDirection;
    }, [state.editor.elements[0].stylePerDevice]);

    return (
        <CanvasProviderContext.Provider
            value={{
                hoveredElement,
                insertPosition,
                dragRef,
                draggedType: canvasDraggedType.current,
                hanldeChangeInsertPosition,
                handleHoverElement,
                handleUpdateContent,
                handleDragRef,
                handleDraggedType,
            }}
        >
            <RenderElementComponent index={0} element={elements[0]} activeDevice={state.editor.device} preset={false} />
        </CanvasProviderContext.Provider>
    );
};

export default CanvasProvider;

export const useCanvas = () => {
    const context = React.useContext(CanvasProviderContext);
    if (context === undefined) {
        throw new Error('useCanvas must be used within a CanvasProvider');
    }
    return context;
};
