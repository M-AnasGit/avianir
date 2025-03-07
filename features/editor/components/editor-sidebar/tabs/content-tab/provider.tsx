'use client';
import React from 'react';
//@CUSTOM HOOK
import { useEditor } from '@/features/editor/provider';
//@TYPES
import { EditorElement, Preset } from '@/features/editor/types';
import { ElementChangeEvent } from './types';
type ContentContextType = {
    currentStyle: React.CSSProperties;
    currentContent: EditorElement['content'];
    sameConfigAcrossDevices: boolean;
    handleChangeConfigAcrossDevices: (value: boolean) => void;
    handleStyleChange: (e: ElementChangeEvent) => void;
    handleBatchStyleChange: (e: ElementChangeEvent[]) => void;
    handleApplyPreset: (preset: Preset) => void;
    handleDelete: () => void;
    handleContentChange: (e: ElementChangeEvent) => void;
};

const ContentContext = React.createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { state, dispatch } = useEditor();

    const currentStyle: React.CSSProperties = React.useMemo(() => {
        return state.editor.selectedElement?.stylePerDevice[state.editor.device] || {};
    }, [state.editor.selectedElement?.stylePerDevice, state.editor.device]);

    const currentContent: EditorElement['content'] = React.useMemo(() => {
        return state.editor.selectedElement?.content || [];
    }, [state.editor.selectedElement?.content]);

    const sameConfigAcrossDevices = React.useMemo<boolean>(() => {
        return !!state.editor.selectedElement?.globalStyle;
    }, [state.editor.selectedElement?.globalStyle]);

    const handleChangeConfigAcrossDevices = React.useCallback(
        (value: boolean) => {
            if (state.editor.selectedElement) {
                const currentStyle = state.editor.selectedElement.stylePerDevice[state.editor.device];

                let newStylePerDevice: EditorElement['stylePerDevice'] = {
                    ...state.editor.selectedElement.stylePerDevice,
                };

                if (value) {
                    Object.entries(state.editor.selectedElement.stylePerDevice).forEach(([device]) => {
                        newStylePerDevice = {
                            ...newStylePerDevice,
                            [device]: {
                                ...currentStyle,
                            },
                        };
                    });
                }

                dispatch({
                    type: 'UPDATE_ELEMENT',
                    payload: {
                        elementDetails: {
                            ...state.editor.selectedElement,
                            stylePerDevice: newStylePerDevice,
                            globalStyle: value,
                            preset: undefined,
                        },
                    },
                });
            }
        },
        [state.editor.selectedElement?.stylePerDevice, state.editor.device, dispatch],
    );

    const handleStyleChange = (e: ElementChangeEvent) => {
        if (state.editor.selectedElement === null) {
            return;
        }

        const { id, value } = e.target;
        let styles = state.editor.selectedElement.stylePerDevice;

        if (sameConfigAcrossDevices) {
            Object.entries(styles).forEach(([device, style]) => {
                styles = {
                    ...styles,
                    [device]: {
                        ...style,
                        [id]: value,
                    },
                };
            });
        } else {
            styles = {
                ...styles,
                [state.editor.device]: {
                    ...styles[state.editor.device],
                    [id]: value,
                },
            };
        }

        dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
                elementDetails: {
                    ...state.editor.selectedElement,
                    stylePerDevice: {
                        ...styles,
                    },
                    preset: undefined,
                },
            },
        });
    };

    const handleBatchStyleChange = (e: ElementChangeEvent[]) => {
        if (state.editor.selectedElement === null) {
            return;
        }

        let styles = state.editor.selectedElement.stylePerDevice;

        e.forEach((event) => {
            const { id, value } = event.target;

            if (sameConfigAcrossDevices) {
                Object.entries(styles).forEach(([device, style]) => {
                    styles = {
                        ...styles,
                        [device]: {
                            ...style,
                            [id]: value,
                        },
                    };
                });
            } else {
                styles = {
                    ...styles,
                    [state.editor.device]: {
                        ...styles[state.editor.device],
                        [id]: value,
                    },
                };
            }
        });

        dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
                elementDetails: {
                    ...state.editor.selectedElement,
                    stylePerDevice: {
                        ...styles,
                    },
                    preset: undefined,
                },
            },
        });
    };

    const handleApplyPreset = (preset: Preset) => {
        if (state.editor.selectedElement === null) {
            return;
        }

        const { name, stylePerDevice, globalStyle } = preset;
        dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
                elementDetails: {
                    ...state.editor.selectedElement,
                    stylePerDevice: stylePerDevice,
                    globalStyle: !!globalStyle,
                    preset: name,
                },
            },
        });
    };

    const handleContentChange = (e: ElementChangeEvent) => {
        if (state.editor.selectedElement === null || Array.isArray(state.editor.selectedElement.content)) {
            return;
        }

        const { id, value } = e.target;

        dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
                elementDetails: {
                    ...state.editor.selectedElement,
                    content: {
                        ...state.editor.selectedElement.content,
                        [id]: value,
                    },
                },
            },
        });
    };

    const handleDelete = React.useCallback(() => {
        dispatch({
            type: 'DELETE_ELEMENT',
        });
    }, [dispatch]);

    return (
        <ContentContext.Provider
            value={{
                currentStyle,
                currentContent,
                sameConfigAcrossDevices,
                handleStyleChange,
                handleBatchStyleChange,
                handleApplyPreset,
                handleContentChange,
                handleDelete,
                handleChangeConfigAcrossDevices,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = React.useContext(ContentContext);

    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }

    return context;
};
