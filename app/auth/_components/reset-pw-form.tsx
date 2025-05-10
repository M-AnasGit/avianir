'use client';
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
//@LUCIDE REACT
import { Loader2 } from 'lucide-react';
//@CUSTOM COMPONENTS
import PasswordInput from '@/components/form-password-input';
//@VALIDATION
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordSchema } from '@/services/auth/helpers';
//@CUSTOM HOOKS
import useAuth from '@/services/auth/hooks';

export default function ResetPwForm() {
    const { resetPasswordMutation, isResetPasswordPending } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordSchema) => {
        resetPasswordMutation({ data });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="relative space-y-1">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                    id="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                    register={register}
                    error={errors.password}
                />
            </div>
            <div className="relative space-y-1">
                <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                    register={register}
                    error={errors.confirmPassword}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isResetPasswordPending}>
                {isResetPasswordPending ? <Loader2 className="size-8 animate-spin" /> : 'Reset password'}
            </Button>

            <Button asChild variant="outline" className="w-full" disabled={isResetPasswordPending}>
                <Link
                    href={{
                        pathname: '/',
                    }}
                >
                    Go home
                </Link>
            </Button>
        </form>
    );
}
