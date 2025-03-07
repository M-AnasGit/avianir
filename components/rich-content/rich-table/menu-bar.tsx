'use client';
import React from 'react';
import { Editor } from '@tiptap/react';
//@SHADCNUI
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
//@LUICDE REACT
import {
    BetweenHorizonalEnd,
    BetweenHorizonalStart,
    BetweenVerticalEnd,
    BetweenVerticalStart,
    Combine,
    Grid2x2X,
    ListX,
    TableColumnsSplit,
} from 'lucide-react';

type Buttons = {
    icon: React.ReactNode;
    action: () => void;
    pressed?: boolean;
    tooltip?: boolean;
};

type Props = {
    editor: Editor;
};

export default function MenuBar({ editor }: Props) {
    const buttons = React.useMemo<Record<string, Buttons> | null>(() => {
        if (!editor) return null;

        return {
            'header row': {
                icon: <span>Header row</span>,
                action: () => editor.chain().focus().toggleHeaderRow().run(),
                pressed: editor.isActive('tableHeaderRow'),
            },
            'header column': {
                icon: <span>Header column</span>,
                action: () => editor.chain().focus().toggleHeaderColumn().run(),
                pressed: editor.isActive('tableHeaderColumn'),
            },
            'insert table': {
                icon: <span>Insert table</span>,
                action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
            },
            'delete table': {
                icon: <span>Delete table</span>,
                action: () => editor.chain().focus().deleteTable().run(),
            },
            'add col before': {
                icon: <BetweenVerticalStart />,
                action: () => editor.chain().focus().addColumnBefore().run(),
                tooltip: true,
            },
            'add col after': {
                icon: <BetweenVerticalEnd />,
                action: () => editor.chain().focus().addColumnAfter().run(),
                tooltip: true,
            },
            'delete col': {
                icon: <Grid2x2X />,
                action: () => editor.chain().focus().deleteColumn().run(),
                tooltip: true,
            },
            'add row before': {
                icon: <BetweenHorizonalStart />,
                action: () => editor.chain().focus().addRowBefore().run(),
                tooltip: true,
            },
            'add row after': {
                icon: <BetweenHorizonalEnd />,
                action: () => editor.chain().focus().addRowAfter().run(),
                tooltip: true,
            },
            'delete row': {
                icon: <ListX />,
                action: () => editor.chain().focus().deleteRow().run(),
                tooltip: true,
            },
            'merge cells': {
                icon: <Combine />,
                action: () => editor.chain().focus().mergeCells().run(),
                tooltip: true,
            },
            'split cell': {
                icon: <TableColumnsSplit />,
                action: () => editor.chain().focus().splitCell().run(),
                tooltip: true,
            },
        };
    }, [editor, editor?.state.selection]);

    if (!editor) {
        return null;
    }

    return (
        <div className="control-group bg-background pb-2 text-muted-foreground">
            <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                    {buttons &&
                        Object.entries(buttons).map(([key, btn]) =>
                            btn.tooltip ? (
                                <Tooltip key={key}>
                                    <TooltipTrigger>
                                        <Toggle asChild pressed={btn.pressed ?? false} onClick={btn.action}>
                                            {btn.icon}
                                        </Toggle>
                                    </TooltipTrigger>
                                    <TooltipContent className="capitalize">{key}</TooltipContent>
                                </Tooltip>
                            ) : (
                                <Toggle key={key} onClick={btn.action} pressed={btn.pressed ?? false}>
                                    {btn.icon}
                                </Toggle>
                            ),
                        )}
                </div>
            </TooltipProvider>
        </div>
    );
}
