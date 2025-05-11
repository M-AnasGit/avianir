'use client';
import React from 'react';
import Loading from '@/components/loading';

import useUserData from './hooks/useUserData';
import { useQuery } from '@tanstack/react-query';
import { getUserData, updateUserPasswordEmail } from './server-actions/user-data';

import { Course, uploadMediaType } from './types';
import { Media, UserWithDetails } from '../types';
import { User } from '@supabase/supabase-js';
import { UserWithEmail } from '../types';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

type UserProviderContextType = {
    auth: SupabaseAuthClient;
    user: UserWithEmail | undefined;
    media: Media[];
    courses: Course[];
    canUpload: boolean;
    updateUserAvatar: (avatar: File | null) => Promise<void>;
    updateUserData: (user: UserWithDetails) => Promise<void>;
    updateUserPassword: (token: string) => Promise<void>;
    createMedia: (media_id: string, name: string, type: 'image' | 'video' | 'audio', size: number) => Promise<void>;
    getUploadMediaUrl: (data: uploadMediaType) => Promise<{
        url: string;
        id: string;
    }>;
    downloadMedia: (media_id: string) => Promise<string>;
    updateMediaData: (media_id: string, name: string) => Promise<void>;
    deleteMedia: (media_id: string) => Promise<void>;
};
type UserProviderProps = React.PropsWithChildren<{
    auth: SupabaseAuthClient;
    authUser: User | undefined;
}>;

const UserProviderContext = React.createContext<UserProviderContextType | undefined>(undefined);

const UserProvider = ({ auth, authUser, children }: UserProviderProps) => {
    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', authUser?.id],
        queryFn: () => getUserData(authUser?.id as string),
        retry: 3,
        enabled: !!authUser?.id,
    });

    const {
        media,
        courses,
        isLoading,
        canUpload,
        updateUserAvatarMutation,
        updateUserDataMutation,
        updateUserPasswordWithEmailMutation,
        createMediaMutation,
        getUploadMediaUrlMutation,
        downloadMediaMutation,
        updateMediaMutation,
        deleteMediaMutation,
    } = useUserData({
        user,
    });

    const updateUserAvatar = React.useCallback(async (avatar: File | null) => {
        await updateUserAvatarMutation.mutateAsync({ avatar });
    }, []);

    const updateUserData = React.useCallback(
        async (user: UserWithDetails) => {
            await updateUserDataMutation.mutateAsync({ newUser: user });
        },
        [updateUserDataMutation],
    );

    const updateUserPassword = React.useCallback(
        async (token: string) => {
            await updateUserPasswordWithEmailMutation.mutateAsync({ token });
        },
        [updateUserPasswordEmail],
    );

    const getUploadMediaUrl = React.useCallback(
        async (data: uploadMediaType) => {
            const response = await getUploadMediaUrlMutation.mutateAsync(data);
            return response;
        },
        [getUploadMediaUrlMutation],
    );

    const createMedia = React.useCallback(
        async (media_id: string, name: string, type: 'image' | 'video' | 'audio', size: number) => {
            await createMediaMutation.mutateAsync({ media_id, name, type, size });
        },
        [createMediaMutation],
    );

    const downloadMedia = React.useCallback(
        async (media_id: string) => {
            return await downloadMediaMutation.mutateAsync(media_id);
        },
        [downloadMediaMutation],
    );

    const updateMediaData = React.useCallback(
        async (media_id: string, name: string) => {
            await updateMediaMutation.mutateAsync({ media_id, name });
        },
        [updateMediaMutation],
    );

    const deleteMedia = React.useCallback(
        async (media_id: string) => {
            await deleteMediaMutation.mutateAsync({ media_id });
        },
        [deleteMediaMutation],
    );

    if (isLoading || isUserLoading || !authUser) return <Loading />;
    if (user === undefined || media === undefined || courses === undefined)
        throw new Error('Error while fetching user data');

    return (
        <UserProviderContext.Provider
            value={{
                auth,
                user: {
                    ...user,
                    email: authUser?.email as string,
                },
                media,
                courses,
                canUpload,
                updateUserAvatar,
                updateUserData,
                updateUserPassword,
                createMedia,
                getUploadMediaUrl,
                downloadMedia,
                updateMediaData,
                deleteMedia,
            }}
        >
            {children}
        </UserProviderContext.Provider>
    );
};

export default UserProvider;

export const useUser = () => {
    const context = React.useContext(UserProviderContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
