'use client';
import React from 'react';
import { useDropzone } from 'react-dropzone';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@LUCIDE ICONS
import { CloudDownload } from 'lucide-react';
//@CONSTANTS
import { DROPZONE_ACCEPTED_TYPES } from './constants';

type Props = {
    id: string;
    fileType: string;
    fileError: boolean;
    MAX_SIZES: Record<string, number>;
    handleUploadFile: (files: FileList | File[] | null) => void;
};

export default function UploadBox({ id, fileType, fileError, MAX_SIZES, handleUploadFile }: Props) {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (uploadRef.current) {
            uploadRef.current.click();
        }
    };

    const handleDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length >= 1) {
            handleUploadFile(acceptedFiles);
        }
    };
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        maxSize: MAX_SIZES[fileType.split('/')[0]],
        onDrop: handleDrop,
        accept: DROPZONE_ACCEPTED_TYPES[fileType.split('/')[0]],
    });

    return (
        <>
            <div
                {...getRootProps()}
                onDragOver={(e) => e.preventDefault()}
                className={`flex h-fit w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-muted py-8 text-muted-foreground ${fileError ? 'border border-destructive' : ''} `}
            >
                <CloudDownload size={128} />
                <Button type="button" onClick={handleClick}>
                    Upload a file
                </Button>
                <span className="text-sm">...or drag and drop it here</span>
            </div>
            <input
                ref={uploadRef}
                aria-hidden="true"
                tabIndex={-1}
                className="hidden"
                type="file"
                id={id}
                name={id}
                accept={fileType}
                onChange={(e) => handleUploadFile(e.target.files)}
                {...getInputProps()}
            />
        </>
    );
}
