'use server';
import { redirect } from 'next/navigation';
//@SUPABASE
import serverClient from '@/db/server';
import { AuthError } from '@supabase/supabase-js';
//@CONSTANTS
import { EMAIL_REGEX, PW_REGEX } from './constants';

const handleError = (error: AuthError) => {
    const message = error.code?.replace(/_/g, ' ').toLowerCase();
    return message ? message.charAt(0).toUpperCase() + message.slice(1) : 'Unexpected error occurred';
};

export const getUser = async () => {
    const supabase = await serverClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error(handleError(userError));

    return user.user;
};

export const registerUser = async (name: string, email: string, password: string, token: string | null) => {
    if (!email) throw new Error('Email is required and should not be empty');
    if (!name) throw new Error('Name is required and should not be empty');
    if (!password) throw new Error('Password is required and should not be empty');
    if (!token) throw new Error('Captcha token is required and should not be empty');

    if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');
    if (!PW_REGEX.test(password))
        throw new Error(
            'Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        );

    const supabase = await serverClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            captchaToken: token,
            data: {
                name: name,
            },
            emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/auth/callback?confirm=true',
        },
    });

    if (error) throw new Error(handleError(error));

    return true;
};

export const oAuthWithGoogleAction = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) throw new Error(handleError(error));

    redirect(data.url);
};

export const loginUser = async (email: string, password: string, token: string | null) => {
    if (!email) throw new Error('Email is required and should not be empty');
    if (!password) throw new Error('Password is required and should not be empty');
    if (!token) throw new Error('Captcha token is required and should not be empty');

    const supabase = await serverClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
            captchaToken: token,
        },
    });

    if (error) throw new Error(handleError(error));

    return true;
};

export const logoutUser = async () => {
    const supabase = await serverClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(handleError(error));

    redirect('/auth?current=login');
};

export const resetPassword = async (email: string, token: string | null) => {
    if (!email) throw new Error('Email is required and should not be empty');
    if (!token) throw new Error('Captcha token is required and should not be empty');

    const supabase = await serverClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        captchaToken: token,
        redirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/auth/callback?reset=true',
    });

    if (error) throw new Error(handleError(error));

    return true;
};

export const updatePassword = async (password: string) => {
    if (!password) throw new Error('Password is required and should not be empty');

    const supabase = await serverClient();
    const { error } = await supabase.auth.updateUser({
        password,
    });

    if (error) throw new Error(handleError(error));

    return true;
};

export const deleteUser = async (userId: string) => {
    if (!userId) throw new Error('User ID is required and should not be empty');

    const supabase = await serverClient();
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) throw new Error(handleError(error));

    return true;
};
