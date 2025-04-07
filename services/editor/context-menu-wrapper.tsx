'use client';
import React from 'react';
import { v4 } from 'uuid';
import { isDisabled } from './helpers';
//@LUCIDE REACT ICONS
import { Trash } from 'lucide-react';
//@SHADCNUI
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
//@CUSTOM COMPONENTS
import GenericModal from '@/components/generic-modal';
import RenameModal from './components/rename-modal';
//@CUSTOM HOOKS
import { useModal } from '@/components/providers/modal-provider';
import { useEditor } from './provider';
//@TYPES
import { EditorElement } from './types';

type Allowed = 'copy' | 'paste' | 'rename' | 'delete' | '*';
type ContextMenuProps = React.PropsWithChildren<{
    ele: EditorElement;
    allowed: Set<Allowed>;
}>;

const ContextMenuWrapper = ({ ele, allowed, children }: ContextMenuProps) => {
    const { state, dispatch, clipboard, handleSetClipboard } = useEditor();
    const { handleSetModal } = useModal();

    const handleContextMenuCopy = React.useCallback((ele: EditorElement) => {
        if (ele.id === '_body') return;
        handleSetClipboard(ele);
    }, []);
    const handleContextMenuPaste = React.useCallback(
        (ele: EditorElement) => {
            if (!clipboard || !Array.isArray(ele.content)) return;

            dispatch({
                type: 'ADD_ELEMENT',
                payload: {
                    containerId: ele.id,
                    elementDetails: {
                        ...clipboard,
                        id: v4(),
                    },
                    position: ele.content.length,
                },
            });
        },
        [clipboard, dispatch],
    );
    const handleContextMenuRename = React.useCallback(
        (ele: EditorElement) => {
            handleSetModal(
                <RenameModal
                    handleRenameElement={(name: string) => {
                        dispatch({
                            type: 'UPDATE_ELEMENT',
                            payload: {
                                elementDetails: {
                                    ...ele,
                                    name: name,
                                },
                            },
                        });
                    }}
                />,
            );
        },
        [dispatch],
    );
    const handleContextMenuDelete = React.useCallback(() => {
        handleSetModal(
            <GenericModal
                title="Delete item"
                description="Are you sure you want to delete this item?"
                btn_text="Delete"
                btn_action={() => {
                    dispatch({
                        type: 'DELETE_ELEMENT',
                    });
                }}
            />,
        );
    }, [dispatch]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!state.editor.selectedElement) return;

            if (e.ctrlKey && e.key === 'c') {
                handleContextMenuCopy(state.editor.selectedElement);
            }
            if (e.ctrlKey && e.key === 'v') {
                handleContextMenuPaste(state.editor.selectedElement);
            }
            if (e.ctrlKey && e.altKey && e.key === 'r') {
                handleContextMenuRename(state.editor.selectedElement);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [clipboard, state]);

    return (
        <ContextMenu modal={false}>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                {(allowed.has('copy') || allowed.has('*')) && (
                    <ContextMenuItem
                        inset
                        className="flex cursor-pointer items-center justify-between gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleContextMenuCopy(ele);
                        }}
                    >
                        Copy
                        <ContextMenuShortcut>Ctrl + C</ContextMenuShortcut>
                    </ContextMenuItem>
                )}
                {(allowed.has('paste') || allowed.has('*')) && (
                    <ContextMenuItem
                        inset
                        className="flex cursor-pointer items-center justify-between gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleContextMenuPaste(ele);
                        }}
                        disabled={isDisabled(ele, clipboard)}
                    >
                        Paste
                        <ContextMenuShortcut>Ctrl + V</ContextMenuShortcut>
                    </ContextMenuItem>
                )}
                {allowed.has('*') && <ContextMenuSeparator />}
                {(allowed.has('rename') || allowed.has('*')) && (
                    <ContextMenuItem
                        inset
                        className="flex cursor-pointer items-center justify-between gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleContextMenuRename(ele);
                        }}
                    >
                        Rename
                        <ContextMenuShortcut>Ctrl + alt + R</ContextMenuShortcut>
                    </ContextMenuItem>
                )}
                {allowed.has('*') && <ContextMenuSeparator />}
                {(allowed.has('delete') || allowed.has('*')) && (
                    <ContextMenuItem
                        inset
                        className="flex cursor-pointer items-center justify-between gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleContextMenuDelete();
                        }}
                    >
                        Delete
                        <Trash size={16} />
                    </ContextMenuItem>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
};
export default ContextMenuWrapper;
