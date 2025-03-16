'use client';
import React from 'react';
import ElementSkeleton from './base/element-skeleton';
//@CUSTOM HOOK
import { useEditor } from '@/features/editor/provider';
//@TYPES
import { EditorElement, ElementTypes } from '@/features/editor/types';

type CanvasProviderContextType = {
    hoveredElement: HTMLElement | null;
    insertPosition: InsertPositionType | null;
    dragRef: React.RefObject<string | null>;
    draggedType: ElementTypes | null;
    hanldeChangeInsertPosition: (newPosition: InsertPositionType | null) => void;
    handleHoverElement: (element: HTMLElement | null) => void;
    handleUpdateContent: (content: EditorElement['content']) => void;
    handleDragRef: (id?: string, moving?: boolean) => void;
};

export type InsertPositionType = {
    id: string;
    position: number;
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

    const flexDirection = React.useMemo(() => {
        return state.editor.elements[0].stylePerDevice[state.editor.device].flexDirection;
    }, [state.editor.elements[0].stylePerDevice]);

    return (
        <CanvasProviderContext.Provider
            value={{
                hoveredElement,
                insertPosition,
                dragRef,
                draggedType,
                hanldeChangeInsertPosition,
                handleHoverElement,
                handleUpdateContent,
                handleDragRef,
            }}
        >
            <ElementSkeleton index={0} ele={elements[0]} flexDirection={flexDirection} />
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
