'use client';
import React from 'react';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Props = {
    url: string;
};

export default function TutorialVideoModal({ url }: Props) {
    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Tutorial video</DialogTitle>
                <DialogDescription>
                    Video will be played here to show how to use one of the editor's features.
                </DialogDescription>
            </DialogHeader>
        </>
    );
}
