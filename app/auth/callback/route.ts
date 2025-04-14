import { NextResponse } from 'next/server';
import serverClient from '@/db/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const newOrigin = origin.replace('localhost', '127.0.0.1');

    const code = searchParams.get('code');
    const confirm = searchParams.get('confirm');

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalEnv = process.env.NODE_ENV === 'development';

    if (code) {
        const supabase = await serverClient();
        try {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

            if (exchangeError) {
                console.error('Exchange error:', exchangeError);
                return NextResponse.redirect(`${newOrigin}/auth?error=oauth_failed`);
            }

            if (isLocalEnv) {
                return NextResponse.redirect(newOrigin);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}`);
            }
            return NextResponse.redirect(newOrigin);
        } catch (err) {
            console.error('Unexpected error:', err);
            return NextResponse.redirect(`${newOrigin}/auth?error=unexpected_error`);
        }
    }

    if (confirm) {
        return NextResponse.redirect(`${newOrigin}/auth/callback/confirm`);
    }

    return NextResponse.redirect(`${newOrigin}/auth`);
}
