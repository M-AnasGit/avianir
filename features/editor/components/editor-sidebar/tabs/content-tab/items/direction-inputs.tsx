'use client';
import React from 'react';
//@LUCIDE REACT
import {
    AlignEndVertical,
    AlignStartVertical,
    AlignVerticalJustifyEnd,
    AlignVerticalJustifyStart,
    Info,
    Link,
    LucideIcon,
    Unlink,
} from 'lucide-react';
//@SHADCNUI
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
//@CUSTOM COMPONENT
import InputWithIcon from './input-with-icon';
//@CUSTOM HOOK
import { useContent } from '../provider';
//@TYPES
import { ElementChangeEvent } from '../types';
type Directions = 'top' | 'bottom' | 'right' | 'left';
type Props = {
    id: 'padding' | 'margin' | 'border' | 'borderRadius';
    label?: string;
};

const AVAILABLE_DIRECTIONS: Record<
    Directions,
    Record<'padding' | 'margin' | 'border' | 'borderRadius', keyof React.CSSProperties>
> = {
    top: {
        padding: 'paddingTop',
        margin: 'marginTop',
        border: 'borderTopWidth',
        borderRadius: 'borderTopLeftRadius',
    },
    bottom: {
        padding: 'paddingBottom',
        margin: 'marginBottom',
        border: 'borderBottomWidth',
        borderRadius: 'borderBottomRightRadius',
    },
    right: {
        padding: 'paddingRight',
        margin: 'marginRight',
        border: 'borderRightWidth',
        borderRadius: 'borderTopRightRadius',
    },
    left: {
        padding: 'paddingLeft',
        margin: 'marginLeft',
        border: 'borderLeftWidth',
        borderRadius: 'borderBottomLeftRadius',
    },
};
const DIRECTIONS_ICONS: Record<Directions, LucideIcon> = {
    top: AlignVerticalJustifyStart,
    bottom: AlignVerticalJustifyEnd,
    right: AlignEndVertical,
    left: AlignStartVertical,
};

export default function DirectionInputs({ id, label = '' }: Props) {
    const { currentStyle: style, handleStyleChange, handleBatchStyleChange } = useContent();

    const [link, setLink] = React.useState<boolean>(true);
    const handleLink = (v: boolean) => {
        setLink(v);

        if (v) {
            let temp = parseInt((style[AVAILABLE_DIRECTIONS.top[id]] as string) ?? '0');
            const valSet = new Set<number>([temp]);

            Object.values(AVAILABLE_DIRECTIONS).forEach((s) => {
                const key = s[id];
                const value = parseInt((style[key] as string) ?? '0');

                if (!valSet.has(value)) {
                    valSet.add(value);
                }
            });

            if (valSet.size !== 1) {
                let targets: ElementChangeEvent[] = [];
                let max = Math.max(...Array.from(valSet));

                Object.values(AVAILABLE_DIRECTIONS).forEach((s) => {
                    targets.push({
                        target: {
                            id: s[id],
                            value: `${max}px`,
                        },
                    });
                });

                handleBatchStyleChange(targets);
            }
        }
    };

    const handleChange = (value: string) => {
        let tempVal = parseInt(value);

        if (isNaN(tempVal)) {
            tempVal = 0;
        }

        let targets: ElementChangeEvent[] = [];

        Object.values(AVAILABLE_DIRECTIONS).forEach((s) => {
            targets.push({
                target: {
                    id: s[id],
                    value: `${tempVal}px`,
                },
            });
        });

        handleBatchStyleChange(targets);
    };

    const handleIndividualChange = (value: string, dir: Directions) => {
        let tempVal = parseInt(value);

        if (isNaN(tempVal)) {
            tempVal = 0;
        }

        handleStyleChange({
            target: {
                id: AVAILABLE_DIRECTIONS[dir][id],
                value: `${tempVal}px`,
            },
        });
    };

    return (
        <div className="prop-container">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <h5 className="prop-label capitalize">{label ? label : id}</h5>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info size={12} />
                        </TooltipTrigger>
                        <TooltipContent>All values are in px</TooltipContent>
                    </Tooltip>
                </span>
                <Toggle defaultPressed={link} size="sm" onPressedChange={handleLink}>
                    {link ? <Link /> : <Unlink />}
                </Toggle>
            </div>

            {link ? (
                <Input
                    aria-label={id}
                    id={id}
                    placeholder="px"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                    value={parseInt((style[Object.values(AVAILABLE_DIRECTIONS)[0][id]] as string) ?? '0')}
                />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(AVAILABLE_DIRECTIONS).map(([dir, s], i) => {
                        return (
                            <InputWithIcon
                                key={i}
                                aria-label={`${id}-${dir}`}
                                id={`${s[id]}`}
                                placeholder="px"
                                onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleIndividualChange(e.target.value, dir as Directions)
                                }
                                value={parseInt((style[s[id]] as string) ?? 0)}
                                Icon={DIRECTIONS_ICONS[dir as Directions]}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
