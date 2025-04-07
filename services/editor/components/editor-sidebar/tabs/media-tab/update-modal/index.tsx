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
                <DialogTitle>Update a media</DialogTitle>
                <DialogDescription>Update the media name for future reference.</DialogDescription>
            </DialogHeader>
            <UpdateForm id={id} />
        </>
    );
}
