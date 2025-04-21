'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//@CUSTOM COMPONENTS
import Loading from '@/components/loading';
//@PROVIDERS
import UserProvider from '@/services/user/provider';

const queryClient = new QueryClient();

export default function App() {
    return (
        <div className="z-[20] min-h-screen bg-muted">
            <QueryClientProvider client={queryClient}>
                <LogOutButton />
            </QueryClientProvider>
        </div>
    );
}

import useAuth from '@/services/auth/hooks';

const LogOutButton = () => {
    const { user, isUserDataLoading, logoutUserMutation } = useAuth();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    if (isUserDataLoading) {
        return <Loading />;
    }

    if (!user) {
        btnRef.current?.click();
        return null;
    }

    return (
        <UserProvider user={user}>
            <button ref={btnRef} onClick={() => logoutUserMutation()}>
                Log out
            </button>
        </UserProvider>
    );
};
