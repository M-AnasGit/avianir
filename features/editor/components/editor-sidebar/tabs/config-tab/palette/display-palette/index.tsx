'use client';
import ColorCircle from './color-circle';
//@LUCIDE ICONS
import { Sun, Moon } from 'lucide-react';
//@TYPES
import { Palette } from '@/features/editor/types';
type Props = {
    palette: Palette['custom'];
};

export default function DisplayPalette({ palette }: Props) {
    return (
        <>
            <span className="flex justify-between gap-x-8 text-muted-foreground">
                <Sun size={20} />
                <Moon size={20} />
            </span>
            <div className="flex flex-col gap-y-4">
                {Object.entries(palette).map(([key, value], i) => {
                    return (
                        <div className="flex items-center justify-between" key={i}>
                            <ColorCircle value={value.light} />
                            <p className="prop-label max-w-[200px] flex-shrink-0 text-center capitalize">{key}</p>
                            <ColorCircle value={value.dark} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
