import { Locator, Page } from '@playwright/test';
import CanvasComponent from './__components__/canvas';
import SidebarContentComponent from './__components__/sidebar-content';
import ModalComponent from './__components__/modal';
import RichContentComponent from './__components__/rich-content';

class EditorPage {
    public url = 'http://127.0.0.1:3000';

    readonly page: Page;

    readonly $sidebar_content: SidebarContentComponent;
    readonly $canvas: CanvasComponent;
    readonly $modal: ModalComponent;
    readonly $richContent: RichContentComponent;

    constructor(page: Page) {
        this.page = page;
        this.$sidebar_content = new SidebarContentComponent(page);
        this.$canvas = new CanvasComponent(page);
        this.$modal = new ModalComponent(page);
        this.$richContent = new RichContentComponent(page);
    }

    /**
     * Navigates to the editor page.
     */
    public async goto() {
        await this.page.goto(this.url);
        await this.page.getByTestId('loading').waitFor({ state: 'hidden' });
    }

    /**
     * Clicks on a button by test ID.
     * @param testId The test ID of the button.
     */
    public async clickButton(testId: string) {
        const button = this.page.getByTestId(testId);
        await button.waitFor({ state: 'visible' });
        await button.click();
    }

    /**
     * Gets a locator by test ID.
     * @param testId The test ID of the element.
     */
    public getByTestId(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    /**
     * Types text in an input by test ID.
     *
     * @param testId - The test ID of the input
     * @param text - The text to type in the input
     */
    public async typeInInput(testId: string, text: string) {
        const input = this.page.getByTestId(testId);
        await input.waitFor({ state: 'visible' });
        await input.fill(text);
    }
}

export default EditorPage;
