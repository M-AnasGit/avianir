import { Locator, Page } from '@playwright/test';

class NavigationComponent {
    readonly page: Page;
    readonly $navigation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.$navigation = page.getByTestId('editor-navigation');
    }
}

export default NavigationComponent;
