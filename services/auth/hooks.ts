'use client';
import { useMutation } from '@tanstack/react-query';
import {
    loginUser,
    logoutUser,
    registerUser,
    oAuthWithGoogleAction,
    resetPassword,
    updatePassword,
} from './server-actions';
import { ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from './validations';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function useAuth() {
    const router = useRouter();

    const { mutate: registerUserMutation, isPending: isRegistrationPending } = useMutation({
        mutationFn: ({ data, token }: { data: RegisterSchema; token: string | null }) => {
            return registerUser(data.name, data.email, data.password, token);
        },
        onSuccess: () => {
            toast({
                title: 'Registration Successful',
                description:
                    'Your account has been created successfully. Please check your email to verify your account.',
                variant: 'default',
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Registration Failed',
                description: `${err}. Please try again.`,
                variant: 'destructive',
            });
        },
    });

    const { mutate: oAuthWithGoogle, isPending: oAuthWithGooglePending } = useMutation({
        mutationFn: () => {
            return oAuthWithGoogleAction();
        },
    });

    const { mutate: loginUserMutation, isPending: isLoginPending } = useMutation({
        mutationFn: ({ data, token }: { data: LoginSchema; token: string | null }) => {
            return loginUser(data.email, data.password, token);
        },
        onSuccess: () => {
            router.push('/');
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Login Failed',
                description: `${err}. Please try again.`,
                variant: 'destructive',
            });
        },
    });

    const { mutate: logoutUserMutation, isPending: isLogoutPending } = useMutation({
        mutationFn: () => {
            return logoutUser();
        },
    });

    const { mutate: forgotPasswordMutation, isPending: isForgotPasswordPending } = useMutation({
        mutationFn: ({ data, token }: { data: ForgotPasswordSchema; token: string | null }) => {
            return resetPassword(data.email, token);
        },
        onSuccess: () => {
            toast({
                title: 'Reset Password',
                description: 'Check your email for the reset password link.',
                variant: 'default',
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Reset Password Failed',
                description: `${err}. Please try again.`,
                variant: 'destructive',
            });
        },
    });

    const { mutate: resetPasswordMutation, isPending: isResetPasswordPending } = useMutation({
        mutationFn: ({ data }: { data: ResetPasswordSchema }) => {
            return updatePassword(data.password);
        },
        onSuccess: () => {
            toast({
                title: 'Password Updated',
                description: 'Your password has been updated successfully.',
                variant: 'default',
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Update Password Failed',
                description: `${err}. Please try again.`,
                variant: 'destructive',
            });
        },
    });

    return {
        registerUserMutation,
        isRegistrationPending,
        oAuthWithGoogle,
        oAuthWithGooglePending,
        loginUserMutation,
        isLoginPending,
        logoutUserMutation,
        isLogoutPending,
        forgotPasswordMutation,
        isForgotPasswordPending,
        resetPasswordMutation,
        isResetPasswordPending,
    };
}
