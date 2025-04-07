'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
//@CUSTOM COMPONENTS
import InputWithErrors from '@/components/input-with-errors';

type Props = {
    handleRenameElement: (name: string) => void;
};

export default function RenameModal({ handleRenameElement }: Props) {
    const [nameError, setNameError] = React.useState<Record<'message', string>>({ message: '' });

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const elementName = formData.get('elementName') as string;

        if (!elementName) {
            setNameError({ message: 'Required' });
            return;
        }

        setNameError({ message: '' });
        handleRenameElement(elementName);

        closeBtnRef.current?.click();
    };

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Rename element</DialogTitle>
                <DialogDescription>Rename the selected element and save it.</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <InputWithErrors
                    id={'elementName'}
                    label={'Name'}
                    type={'text'}
                    placeholder="Element name"
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
