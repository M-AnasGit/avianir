'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

type Props = React.PropsWithChildren;

export default function ErrorToast({ children }: Props) {
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const fetchError = () => {
            const errors = searchParams
                .keys()
                .filter((key) => key.includes('error'))
                .toArray();

            return { errors, isError: errors.length > 0 };
        };

        if (fetchError().isError) {
            console.log('Errors:', fetchError().errors);

            toast({
                title: 'Unexpected error',
                description: 'An unexpected error occurred while processing your request.',
                variant: 'destructive',
            });
        }
    }, [searchParams]);

    return children;
}
