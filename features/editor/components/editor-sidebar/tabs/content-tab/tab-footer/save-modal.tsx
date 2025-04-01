'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
//@CUSTOM COMPONENTS
import InputWithErrors from '@/components/input-with-errors';
//@TYPES
import { EditorElement, EditorState, Preset } from '@/features/editor/types';
type Props = {
    selectedElement: EditorState['editor']['selectedElement'];
    presets: Preset[];
    updateCourseData: (id: string, data: Preset[]) => Promise<void>;
};

const cleanContentFromId = (content: EditorElement[]): Preset[] => {
    return content.map((item) => {
        const { id, ...rest } = item;
        let curr = { ...rest } as Preset;

        if (Array.isArray(item.content)) {
            curr = {
                ...rest,
                content: cleanContentFromId(item.content),
            } as Preset;
        }

        return curr;
    });
};

const cleanContentFromSrc = (content: { text?: string; src?: string; alt?: string }): { text?: string } => {
    const { text, ...rest } = content;

    return {
        text,
    };
};

export default function SaveModal({ selectedElement, presets, updateCourseData }: Props) {
    const [nameError, setNameError] = React.useState<Record<'message', string>>({ message: '' });

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const presetName = formData.get('presetName') as string;

        if (!presetName) {
            setNameError({ message: 'Required' });
            return;
        }

        if (presets && presets.find((p) => p.name.toLocaleUpperCase() === presetName.toLocaleUpperCase())) {
            setNameError({ message: 'Already exists' });
            return;
        }

        if (!selectedElement) {
            setNameError({ message: 'No selected element' });
            return;
        }
        setNameError({ message: '' });

        await updateCourseData('presets', [
            ...presets,
            {
                name: presetName,
                stylePerDevice: selectedElement.stylePerDevice,
                globalStyle: selectedElement.globalStyle,
                type: selectedElement.type,
                content: Array.isArray(selectedElement.content)
                    ? cleanContentFromId(selectedElement.content)
                    : cleanContentFromSrc(selectedElement.content),
                ...(selectedElement.formContent && { formContent: selectedElement.formContent }),
            },
        ]);

        closeBtnRef.current?.click();
    };

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Save preset</DialogTitle>
                <DialogDescription>Save the current style configuration as a preset for future use.</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <InputWithErrors
                    id={'presetName'}
                    label={'Name'}
                    type={'text'}
                    placeholder="Name your preset"
                    error={nameError}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button ref={closeBtnRef} type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </form>
        </>
    );
}
