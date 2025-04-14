'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
//@LUCIDE REACT
import { Loader2 } from 'lucide-react';
//@CUSTOM COMPONENTS
import FormInput from '@/components/form-input';
import PasswordInput from '@/components/form-password-input';
//@VALIDATION
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/services/auth/validations';
//@CUSTOM HOOKS
import useAuth from '@/services/auth/hooks';

export default function LoginForm() {
    const { loginUserMutation, isLoginPending, oAuthWithGoogle, oAuthWithGooglePending } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [token, setToken] = React.useState<string | null>(null);
    const captchaRef = React.useRef<HCaptcha>(null);
    const onSubmit = (data: LoginSchema) => {
        captchaRef.current?.resetCaptcha();
        loginUserMutation({ data, token });
    };

    const onGoogleRegistration = () => {
        oAuthWithGoogle();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form-container">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="auth-form-input"
                        register={register}
                        autoComplete="email"
                        error={errors.email}
                    />
                </div>
                <div className="relative space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                        className="auth-form-input"
                        register={register}
                        error={errors.password}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                        onVerify={setToken}
                        ref={captchaRef}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoginPending}>
                    {isLoginPending ? <Loader2 className="size-8 animate-spin" /> : 'Log in'}
                </Button>
            </form>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
            </div>
            <Button
                variant="outline"
                className="w-full"
                onClick={onGoogleRegistration}
                disabled={oAuthWithGooglePending}
            >
                {oAuthWithGooglePending ? (
                    <Loader2 className="size-8 animate-spin" />
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Google
                    </>
                )}
            </Button>
        </>
    );
}
