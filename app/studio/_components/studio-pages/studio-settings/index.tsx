import React from 'react';
import SettingsThemeSelector from './sections/settings-theme-selector';
import SettingsAuthentication from './sections/settings-authentication';

export default function StudioSettings() {
    return (
        <div className="flex flex-col gap-4">
            <SettingsThemeSelector />
            <SettingsAuthentication />
        </div>
    );
}
