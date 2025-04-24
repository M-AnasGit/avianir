import Link from 'next/link';
import { redirect } from 'next/navigation';
//@CUSTOM COMPONENTS
import AuthHeader from './_components/auth-header';
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
                    <AuthHeader
                        title={`Welcome to ${process.env.NEXT_PUBLIC_PLACEHOLDER_NAME}`}
                        description={
                            <>
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
                            </>
                        }
                    />
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
                By clicking continue, you agree to our{' '}
                <Link href="/legal/terms" target="_blank">
                    Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/policy" target="_blank">
                    Privacy Policy
                </Link>
                .
            </div>
        </>
    );
}

function isFormType(value: string) {
    return FORM_TYPES.includes(value as (typeof FORM_TYPES)[number]);
}
