'use client';
import React from 'react';
//@SHADCNUI
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
//@CUSTOM COMPONENTS
import UpdateForm from './update-form';

type Props = {
    id: string;
};

export default function UpdateModal({ id }: Props) {
    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Upload a media</DialogTitle>
                <DialogDescription>
                    Any media you upload will be available for use in all your documents.
                </DialogDescription>
            </DialogHeader>
            <UpdateForm id={id} />
        </>
    );
}
