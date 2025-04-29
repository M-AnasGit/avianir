import React from 'react';
import Header from '@/components/header';
import { getUser } from '@/services/auth/server-actions';

export default async function App() {
    const user = await getUser();

    return <Header isUser={!!user} />;
}
