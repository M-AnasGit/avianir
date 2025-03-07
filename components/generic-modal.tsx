'use client';
import React from 'react';
import { Button } from './ui/button';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

type Props = {
    title: string;
    description: string;
    btn_text: string;
    btn_action: () => void;
};

export default function GenericModal({ title, description, btn_text, btn_action }: Props) {
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const handleLocalAction = () => {
        btn_action();
        if (closeBtnRef.current) {
            closeBtnRef.current.click();
        }
    };

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button ref={closeBtnRef} type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="button" onClick={handleLocalAction}>
                    {btn_text}
                </Button>
            </DialogFooter>
        </>
    );
}
