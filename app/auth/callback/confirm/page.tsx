import Link from 'next/link';
//@CUSTOM COMPONENTS
import AuthHeader from '../../_components/auth-header';
//@SHADCNUI
import { Button } from '@/components/ui/button';

export default function ConfirmPage() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center">
            <AuthHeader
                title={'Confirm your email address'}
                description={'You have succesfully confirmed your email address. You can now log in to your account.'}
            />
            <Button asChild variant="default" className="mt-4" size="lg">
                <Link href="/auth?current=login">Go to Login</Link>
            </Button>
        </main>
    );
}
