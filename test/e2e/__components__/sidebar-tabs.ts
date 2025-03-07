import { Locator, Page } from '@playwright/test';

class SidebarTabsComponent {
    readonly page: Page;
    readonly $tabs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.$tabs = page.getByTestId('editor-sidebar-tabs');
    }

    /**
     * Clicks on a specific tab by its name.
     * @param tabName The visible name of the tab to click.
     */
    public async clickTab(tabName: string) {
        await this.$tabs.waitFor({ state: 'visible' });
        await this.$tabs.getByTestId(tabName).click();
    }
}

export default SidebarTabsComponent;
