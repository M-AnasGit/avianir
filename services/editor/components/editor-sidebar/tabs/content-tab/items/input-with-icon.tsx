'use client';
//@SHADCNUI
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
//@LUCIDE REACT
import { LucideIcon } from 'lucide-react';

type Props = {
    id: string;
    placeholder: string;
    value: string | number;
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Icon: LucideIcon;
};

export default function InputWithIcon({ id, placeholder, value, onChangeValue, Icon }: Props) {
    const renderDirection = (styleDirection: string) => {
        return styleDirection
            .replace(/^(margin|padding|border|borderRadius)/, '') // Remove specific words
            .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
            .toLowerCase()
            .trim(); // Trim any leading spaces
    };

    return (
        <div className="relative">
            <Tooltip>
                <span className="absolute flex h-full w-[32px] items-center justify-center rounded-s-md border border-input bg-muted">
                    <TooltipTrigger>
                        <Icon className="text-muted-foreground" size={14} />
                    </TooltipTrigger>
                    <TooltipContent className="capitalize">{renderDirection(id)}</TooltipContent>
                </span>
            </Tooltip>

            <Input id={id} placeholder={placeholder} onChange={onChangeValue} value={value} className="pl-[38px]" />
        </div>
    );
}
