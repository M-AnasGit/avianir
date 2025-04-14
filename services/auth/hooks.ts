'use client';
import { useMutation } from '@tanstack/react-query';
import { loginUser, logoutUser, registerUser, oAuthWithGoogleAction } from './server-actions';
import { LoginSchema, RegisterSchema } from './validations';
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
                description: `Error: ${err}. Please try again.`,
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
                description: `Error: ${err}. Please try again.`,
                variant: 'destructive',
            });
        },
    });

    const { mutate: logoutUserMutation, isPending: isLogoutPending } = useMutation({
        mutationFn: () => {
            return logoutUser();
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
    };
}
