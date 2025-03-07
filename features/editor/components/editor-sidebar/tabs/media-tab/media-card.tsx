'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
//@LUCIDE ICONS
import { Check, Clapperboard, ClipboardCopy, Headphones, Image, Trash } from 'lucide-react';
//@HELPERS
import { renderSize } from './helper';
//@TYPES
import { Media } from '@/features/types';
type Props = {
    item: Media;
    handleCardClick: () => void;
    handleDeleteFile: () => void;
};

export default function MediaCard({ item, handleCardClick, handleDeleteFile }: Props) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        handleDeleteFile();
    };

    const handleCopyID = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        navigator.clipboard.writeText(item.id);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <Card
            onClick={handleCardClick}
            className="flex cursor-pointer items-center justify-between py-2 transition-colors duration-200 hover:bg-muted"
        >
            <div className="flex h-full items-center">
                <div className="ml-4 flex h-full rounded-md bg-muted p-4 text-muted-foreground">
                    {item.type === 'image' ? (
                        <Image size={24} />
                    ) : item.type === 'video' ? (
                        <Clapperboard size={24} />
                    ) : (
                        <Headphones size={24} />
                    )}
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <CardHeader className="items-start p-4">
                            <TooltipTrigger>
                                <CardTitle className="max-w-[62px] truncate">{item.name}</CardTitle>
                            </TooltipTrigger>
                            <TooltipContent>{item.name}</TooltipContent>
                            <CardDescription className="text-xs">{renderSize(item.size)}</CardDescription>
                        </CardHeader>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <CardContent className="flex gap-2 p-4">
                <Button type="button" variant="secondary" onClick={handleCopyID} className="px-2">
                    {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
                </Button>
                <Button type="button" variant="destructive" onClick={handleDelete} className="px-2">
                    <Trash size={14} />
                </Button>
            </CardContent>
        </Card>
    );
}
