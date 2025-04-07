import {
    Plus,
    SettingsIcon,
    SquareStackIcon,
    Database,
    SlidersHorizontal,
    BotMessageSquare,
    NotebookText,
} from 'lucide-react';

import ContentTab from './tabs/content-tab';
import ConfigTab from './tabs/config-tab';
import ComponentsTab from './tabs/components-tab';
import LayersTab from './tabs/layers-tab';
import MediaTab from './tabs/media-tab';
import CopilotTab from './tabs/copilot-tab';
import GuidelinesTab from './tabs/guidelines-tab';

export const BETA_services: Set<string> = new Set(['copilot']);

export const SIDEBAR_TABS: Record<string, React.ReactNode> = {
    content: <ContentTab />,
    components: <ComponentsTab />,
    media: <MediaTab />,
    config: <ConfigTab />,
    layers: <LayersTab />,
    guidelines: <GuidelinesTab />,
    copilot: <CopilotTab />,
};

export const SIDEBAR_TABS_ICONS: Record<string, React.ReactNode> = {
    content: <SlidersHorizontal />,
    components: <Plus />,
    media: <Database />,
    config: <SettingsIcon />,
    layers: <SquareStackIcon />,
    guidelines: <NotebookText />,
    copilot: <BotMessageSquare />,
};
