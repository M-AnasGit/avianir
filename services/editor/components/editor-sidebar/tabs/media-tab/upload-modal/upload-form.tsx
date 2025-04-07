'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
//@CUSTOM COMPONENTS
import InputWithErrors from '@/components/input-with-errors';
//@HELPERS
import { renderSize, generateChecksum, convertFileType } from '../helper';
//@CUSTOM HOOKS
import { useUser } from '@/services/user/provider';
import { useUpload } from '@/components/providers/upload-provider';

type Props = {
    fileType: string;
    handleChangeFileType: (val: string) => void;
};

export default function UploadForm({ fileType, handleChangeFileType }: Props) {
    const { media, getUploadMediaUrl, createMedia } = useUser();
    const { file, fileURL, Component, handleDeleteFile } = useUpload();
    const [fileNameError, setFileNameError] = React.useState<Record<'message', string>>({ message: '' });

    const [clicked, setClicked] = React.useState<boolean>(false);
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        if (clicked) return;
        setClicked(true);
        const formData = new FormData(e.currentTarget);
        const mediaName = formData.get('mediaName') as string;

        if (!mediaName) {
            return setFileNameError({ message: 'Required' });
        }
        if (media && media.find((m) => m.name.toLocaleUpperCase() === mediaName.toLocaleUpperCase())) {
            return setFileNameError({ message: 'Already exists' });
        }

        setFileNameError({ message: '' });
        try {
            const { url, id } = await getUploadMediaUrl({ file, fileType, checksum: await generateChecksum(file) });
            if (!url) {
                return console.error('Error fetching signed URL:', 'No signed URL');
            }

            await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });
            await createMedia(id, mediaName, convertFileType(fileType), file.size);
        } catch (err) {
            console.error('Unexpected error occurred:', err);
        } finally {
            closeBtnRef.current?.click();
            setClicked(false);
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
                <div className="flex flex-col gap-1">
                    <Label className="prop-label" htmlFor="type">
                        Type
                    </Label>
                    <Select value={fileType} onValueChange={handleChangeFileType}>
                        <SelectTrigger className="w-[180px]" id="type">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {file && fileURL ? (
                <Card className="flex items-end justify-between">
                    <div className="flex items-center">
                        <div className="ml-4 flex h-full max-w-12">
                            {fileType.startsWith('image') ? (
                                <img src={fileURL} alt={file.name} className="h-full w-auto object-cover" />
                            ) : fileType.startsWith('video') ? (
                                <video src={fileURL} className="h-full w-auto object-cover" />
                            ) : (
                                <audio src={fileURL} className="h-full w-auto object-cover" />
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle>{file.name}</CardTitle>
                            <CardDescription>{renderSize(file.size)}</CardDescription>
                        </CardHeader>
                    </div>

                    <CardContent>
                        <Button type="button" variant="destructive" onClick={handleDeleteFile}>
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                Component
            )}
            <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                    <Button ref={closeBtnRef} type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={!file || clicked}>
                    Upload
                </Button>
            </DialogFooter>
        </form>
    );
}
