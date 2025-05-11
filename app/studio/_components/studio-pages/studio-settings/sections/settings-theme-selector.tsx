import React from 'react';
import { useTheme } from 'next-themes';
//@SHADCNUI
import { Switch } from '@/components/ui/switch';
//@ICONS
import { Moon, Sun } from 'lucide-react';

export default function SettingsThemeSelector() {
    const { theme, setTheme } = useTheme();
    const handleThemeChange = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <div className="edit-profile-container items-start md:flex-row md:items-center">
            <div className="flex w-full flex-col gap-2">
                <h2 className="font-medium">Theme</h2>
                <p className="text-sm text-muted-foreground">
                    Choose between light and dark mode. The default is set to your system preference.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
                <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    );
}
