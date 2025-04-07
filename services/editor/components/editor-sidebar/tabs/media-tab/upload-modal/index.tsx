'use client';
import React from 'react';
//@SHADCNUI
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
//@CUSTOM COMPONENTS
import UploadForm from './upload-form';
//@PROVIDER
import UploadProvider from '@/components/providers/upload-provider';
//@CONSTANTS
import { INPUT_FILE_TYPES, MAX_SIZES } from '@/services/constants';
//@TYPES
import { MediaType } from '@/services/types';

export default function UploadModal() {
    const [fileType, setFileType] = React.useState<MediaType>('image');
    const handleChangeFileType = (val: string) => {
        setFileType(val as MediaType);
    };

    return (
        <UploadProvider id="media" fileType={INPUT_FILE_TYPES[fileType]} MAX_SIZES={MAX_SIZES}>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Upload a media</DialogTitle>
                <DialogDescription>
                    Any media you upload will be available for use in all your documents.
                </DialogDescription>
            </DialogHeader>
            <UploadForm fileType={fileType} handleChangeFileType={handleChangeFileType} />
        </UploadProvider>
    );
}
