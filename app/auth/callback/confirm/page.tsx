'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
//@SHADCNUI
import { Button } from '@/components/ui/button';

const Animation = dynamic(() => import('../_components/email-confirm-animation'), {
    ssr: false,
});

export default function ConfirmPage() {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <div className="h-64 w-64">
                <Animation />
            </div>
            <h1 className="text-2xl font-medium">Your email has been confirmed successfully!</h1>
            <Button asChild variant="default" className="mt-4" size="lg">
                <Link href="/auth?current=login">Go to Login</Link>
            </Button>
        </main>
    );
}
