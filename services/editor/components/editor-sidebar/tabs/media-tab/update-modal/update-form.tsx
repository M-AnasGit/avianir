'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
//@CUSTOM COMPONENTS
import InputWithErrors from '@/components/input-with-errors';
//@CUSTOM HOOKS
import { useUser } from '@/services/user/provider';

type Props = {
    id: string;
};

export default function UpdateForm({ id }: Props) {
    const { media, updateMediaData } = useUser();
    const [fileNameError, setFileNameError] = React.useState<Record<'message', string>>({ message: '' });

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const mediaName = formData.get('mediaName') as string;

        if (!mediaName) {
            setFileNameError({ message: 'Required' });
            return;
        }

        if (media && media.find((m) => m.name.toLocaleUpperCase() === mediaName.toLocaleUpperCase())) {
            setFileNameError({ message: 'Already exists' });
            return;
        }
        setFileNameError({ message: '' });

        try {
            await updateMediaData(id, mediaName);
        } catch (err) {
            console.error('Unexpected error occurred:', err);
        } finally {
            closeBtnRef.current?.click();
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <InputWithErrors
                        id={'mediaName'}
                        label={'Name'}
                        type={'text'}
                        placeholder="Name your media"
                        error={fileNameError}
                    />
                </div>
            </div>
            <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                    <Button ref={closeBtnRef} type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit">Update</Button>
            </DialogFooter>
        </form>
    );
}
