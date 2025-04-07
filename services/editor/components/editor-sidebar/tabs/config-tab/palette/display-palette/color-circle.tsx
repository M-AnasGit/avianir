'use client';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
    value: string;
};

export default function ColorCircle({ value }: Props) {
    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(value);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span
                    className="size-[20px] cursor-pointer rounded-full border border-gray-300"
                    role="button"
                    aria-label="color"
                    onClick={handleClick}
                    style={{
                        backgroundColor: value,
                    }}
                />
            </TooltipTrigger>
            <TooltipContent>{value}</TooltipContent>
        </Tooltip>
    );
}
