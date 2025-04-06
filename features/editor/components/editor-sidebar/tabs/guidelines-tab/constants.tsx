import CommunityGuide from './items/community-guide';
import ContentGuide from './items/content-guide';
import CopilotGuide from './items/copilot-guide';
import FormGuide from './items/form-guide';
import NavigationGuide from './items/navigation-guide';

export const GUIDELINES_TAB_ITEMS: Record<string, React.ReactNode> = {
    navigation: <NavigationGuide />,
    content: <ContentGuide />,
    form: <FormGuide />,
    copilot: <CopilotGuide />,
    community: <CommunityGuide />,
};
