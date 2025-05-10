'use client';
import React from 'react';
import clientSideSupabase from '@/db/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from '@/services/user/provider';
//@TYPES
import { User } from '@supabase/supabase-js';

const client = new QueryClient();

export default function StudioLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [authUser, setAuthUser] = React.useState<User>();
    const auth = React.useMemo(() => clientSideSupabase().auth, []);

    React.useEffect(() => {
        const { data } = auth.onAuthStateChange((_, session) => {
            if (session) {
                setAuthUser(session.user);
            }
        });

        return () => {
            data.subscription.unsubscribe();
        };
    }, []);

    return (
        <QueryClientProvider client={client}>
            <UserProvider auth={auth} authUser={authUser}>
                {children}
            </UserProvider>
        </QueryClientProvider>
    );
}
