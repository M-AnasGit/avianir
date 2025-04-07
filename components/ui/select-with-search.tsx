'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
    data: {
        label: string;
        value: string;
    }[];
    value: string;
    handleValueChange: (value: string) => void;
};

export function SelectWithSearch({ data, value, handleValueChange }: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    <span className="w-[100px] truncate text-left capitalize">
                        {value ? data.find((d) => d.value === value)?.label : 'Select...'}
                    </span>

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((d) => (
                                <CommandItem
                                    key={d.value}
                                    value={d.value}
                                    onSelect={(currentValue) => {
                                        handleValueChange(currentValue);
                                        setOpen(false);
                                    }}
                                    className="capitalize"
                                >
                                    <Check
                                        className={cn('mr-2 h-4 w-4', value === d.value ? 'opacity-100' : 'opacity-0')}
                                    />
                                    {d.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
