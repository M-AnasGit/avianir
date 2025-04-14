import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
//@CUSTOM COMPONENTS
import LoginForm from './_components/login-form';
import RegisterForm from './_components/register-form';
import ForgotPwForm from './_components/forgot-pw-form';
//@CONSTANTS
import { FORM_TYPES } from '@/services/auth/constants';

type Props = {
    searchParams: Promise<{ current: string; error?: string }>;
};

export default async function AuthPage({ searchParams }: Props) {
    const currentParams = await searchParams;
    if (!isFormType(currentParams.current)) {
        redirect('/auth?current=login');
    }

    const isLogin = currentParams.current === 'login';
    const isRegister = currentParams.current === 'register';
    const isForgotPw = currentParams.current === 'forgot-pw';

    return (
        <>
            <div className="mx-auto w-3/4 space-y-4 lg:w-1/3">
                <div className="flex flex-col gap-2 md:gap-4">
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                        <span className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex items-center justify-center">
                                <Image
                                    src="/512x512.png"
                                    alt="Ivor Logo"
                                    width={48}
                                    height={48}
                                    className="rounded-sm"
                                />
                            </div>
                            <span className="sr-only">Ivor</span>
                        </span>
                        <h1 className="text-center text-lg font-bold lg:text-xl">Welcome to Ivor</h1>
                        <div className="text-center text-sm">
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <Link
                                href={{
                                    pathname: '/auth',
                                    query: {
                                        current: isRegister ? 'login' : 'register',
                                    },
                                }}
                                className="underline underline-offset-4"
                                shallow={true}
                            >
                                {isRegister ? 'Log in' : 'Sign up'}{' '}
                            </Link>
                        </div>
                    </div>
                    {currentParams.error && (
                        <small className="rounded-md text-center text-destructive">
                            An error occured while processing your request. Please try again.
                        </small>
                    )}
                    {isLogin && <LoginForm />}
                    {isRegister && <RegisterForm />}
                    {isForgotPw && <ForgotPwForm />}
                </div>
            </div>
            <div className="mx-auto w-3/4 space-y-4 text-balance text-center text-[10px] text-muted-foreground sm:text-xs lg:w-1/3 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <Link href="/legal/terms">Terms of Service</Link> and{' '}
                <Link href="/legal/policy">Privacy Policy</Link>.
            </div>
        </>
    );
}

function isFormType(value: string) {
    return FORM_TYPES.includes(value as (typeof FORM_TYPES)[number]);
}
