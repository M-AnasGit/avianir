import { Page } from '@playwright/test';
import NavigationComponent from './__components__/navigation';
import SidebarTabsComponent from './__components__/sidebar-tabs';
import CanvasComponent from './__components__/canvas';
import SidebarContentComponent from './__components__/sidebar-content';

class EditorPage {
    public url = 'http://localhost:3000';

    readonly page: Page;

    readonly $navigation: NavigationComponent;
    readonly $sidebar_tabs: SidebarTabsComponent;
    readonly $sidebar_content: SidebarContentComponent;
    readonly $canvas: CanvasComponent;

    constructor(page: Page) {
        this.page = page;
        this.$navigation = new NavigationComponent(page);
        this.$sidebar_tabs = new SidebarTabsComponent(page);
        this.$sidebar_content = new SidebarContentComponent(page);
        this.$canvas = new CanvasComponent(page);
    }

    public async goto() {
        await this.page.goto(this.url);
        await this.page.getByTestId('loading').waitFor({ state: 'hidden' });
    }
}

export default EditorPage;
