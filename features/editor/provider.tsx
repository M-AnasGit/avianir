'use client';
import React from 'react';
import Loading from '@/components/loading';
import { defaultPalette, initialState } from './constants';
//@HELPER AND REDUCER
import { loadData } from './helpers';
import editorReducer from './dispatch-actions/reducer';
//@CUSTOM HOOKS
import { useEditorData } from './hooks/useEditorData';
//@TYPES
import { Preset, ChapterData, EditorAction, EditorState, ElementTypes } from './types';
import { useTheme } from 'next-themes';
type EditorContextType = {
    state: EditorState;
    chapter: ChapterData;
    presets: Preset[];
    palette: Palette;
    componentDragged: HTMLElement | null;
    draggedType: ElementTypes | null;
    handleDragComponent: (element: HTMLElement | null, type: ElementTypes | null) => void;
    updateCourseData: (id: string, data: ChapterData | Palette | Preset[]) => Promise<void>;
    dispatch: React.Dispatch<EditorAction>;
};
type EditorProps = React.PropsWithChildren<{
    course_id: string;
    chapter_id: string;
}>;

const EditorContext = React.createContext<EditorContextType | undefined>(undefined);

const EditorProvider = ({ children, course_id, chapter_id }: EditorProps) => {
    const { presets, palette, chapter, isError, isLoading, updateCourseDataMutation } = useEditorData({
        course_id,
        chapter_id,
    });
    const { theme } = useTheme();
    const [localPalette, setLocalPalette] = React.useState<Palette | null>(null);
    const [localPresets, setLocalPresets] = React.useState<Preset[] | null>(null);
    const [state, dispatch] = React.useReducer(editorReducer, initialState);
    React.useEffect(() => {
        if (palette) setLocalPalette(palette);
        if (presets) setLocalPresets(presets);
        if (chapter) {
            dispatch({ type: 'LOAD_DATA', payload: { state: loadData(chapter, course_id, chapter_id) } });
        }
    }, [palette, presets, chapter]);
    React.useEffect(() => {
        if (localPalette && theme) {
            const root = document.documentElement;

            Object.entries(localPalette.default).forEach(([key, value]) => {
                root.style.setProperty(`--default-${key.replace(/\s+/g, '-')}`, value[theme as 'light' | 'dark']);
            });

            Object.entries(localPalette.custom).forEach(([key, value]) => {
                root.style.setProperty(`--custom-${key.replace(/\s+/g, '-')}`, value[theme as 'light' | 'dark']);
            });
        }
    }, [localPalette, theme]);
    const updateCourseData = React.useCallback(
        async (id: string, data: ChapterData | Palette | Preset[]) => {
            await updateCourseDataMutation.mutateAsync({ id, data });
            if (id === 'palette') setLocalPalette(data as Palette);
            if (id === 'presets') setLocalPresets(data as Preset[]);
        },
        [updateCourseDataMutation],
    );

    const [componentDragged, setComponentDragged] = React.useState<HTMLElement | null>(null);
    const [draggedType, setDraggedType] = React.useState<ElementTypes | null>(null);
    const handleDragComponent = React.useCallback((element: HTMLElement | null, type: ElementTypes | null) => {
        setComponentDragged(element);
        setDraggedType(type);
    }, []);

    if (isLoading) return <Loading />;
    if (!presets || !palette || !chapter || isError) throw new Error('Error fetching data');

    return (
        <EditorContext.Provider
            value={{
                state,
                presets: localPresets ?? [],
                palette: localPalette ?? defaultPalette,
                chapter,
                componentDragged,
                draggedType,
                dispatch,
                handleDragComponent,
                updateCourseData,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
export default EditorProvider;

export const useEditor = () => {
    const context = React.useContext(EditorContext);

    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }

    return context;
};
