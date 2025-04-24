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
//@VALIDATION
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/services/auth/validations';
//@CUSTOM HOOKS
import useAuth from '@/services/auth/hooks';

export default function ForgotPwForm() {
    const { forgotPasswordMutation, isForgotPasswordPending } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const tokenRef = React.useRef<string | null>(null);
    const captchaRef = React.useRef<HCaptcha>(null);
    const onVerify = (token: string | null) => {
        tokenRef.current = token;
        formRef.current?.requestSubmit();
    };

    const formRef = React.useRef<HTMLFormElement>(null);
    const preSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (captchaRef.current) {
            captchaRef.current.execute();
        }
    };

    const onSubmit = (data: ForgotPasswordSchema) => {
        captchaRef.current?.resetCaptcha();
        forgotPasswordMutation({ data, token: tokenRef.current });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form-container" ref={formRef}>
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
            <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                onVerify={onVerify}
                size="invisible"
                ref={captchaRef}
            />
            <Button className="w-full" disabled={isForgotPasswordPending} onClick={preSubmit}>
                {isForgotPasswordPending ? <Loader2 className="size-8 animate-spin" /> : 'Send Reset Link'}
            </Button>
        </form>
    );
}
