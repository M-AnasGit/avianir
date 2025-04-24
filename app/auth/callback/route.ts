'use server';
import { NextResponse } from 'next/server';
import serverClient from '@/db/server';

const isLocalEnv = process.env.NODE_ENV === 'development';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const newOrigin = origin.replace('localhost', '127.0.0.1');

    const code = searchParams.get('code');
    const confirm = searchParams.get('confirm');
    const reset = searchParams.get('reset');

    const forwardedHost = request.headers.get('x-forwarded-host');

    const supabase = await serverClient();

    if (code) {
        if (confirm) {
            return NextResponse.redirect(`${newOrigin}/auth/callback/confirm`);
        }

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
            console.error('Exchange error:', exchangeError);
            return NextResponse.redirect(`${newOrigin}/auth?error=oauth_failed`);
        }

        if (reset) {
            return NextResponse.redirect(`${newOrigin}/auth/callback/reset`);
        }

        return NextResponse.redirect(isLocalEnv ? `${newOrigin}` : `https://${forwardedHost}`);
    } else {
        return NextResponse.redirect(`${newOrigin}/auth`);
    }
}
