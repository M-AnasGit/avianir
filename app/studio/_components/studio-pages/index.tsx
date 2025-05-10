import React from 'react';
import dynamic from 'next/dynamic';

interface ProfileProps {}

interface SettingsProps {}

interface HelpProps {}

export type Props = ProfileProps | SettingsProps | HelpProps;

export const TabComponents: Record<string, React.ComponentType<Props>> = {
    profile: dynamic(() => import('./studio-profile')),
    settings: dynamic(() => import('./studio-settings')),
    help: dynamic(() => import('./studio-help')),
};
