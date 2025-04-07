import { Locator, Page } from '@playwright/test';

class RichContentComponent {
    protected page: Page;
    readonly $richContentEditable: Locator;
    readonly $richContentNotEditable: Locator;

    constructor(page: Page) {
        this.page = page;
        const editorContainer = this.page.locator(`[data-testid="rich-content"]`);
        this.$richContentEditable = editorContainer.locator('[contenteditable="true"]');
        this.$richContentNotEditable = editorContainer.locator('[contenteditable="false"]');
    }

    /**
     * types text in the rich input
     *
     * @param text - The text to type in the rich input
     */
    public async typeInRichInput(text: string) {
        await this.$richContentEditable.waitFor({ state: 'visible' });
        await this.$richContentEditable.click();
        await this.$richContentEditable.fill(text);
    }

    /**
     * @param optId - The id of the option to toggle
     */
    public async toggleRichTextMenuOption(optId: string) {
        const menuButton = this.page.getByTestId(`menu-bar-${optId}`);
        await menuButton.waitFor({ state: 'visible' });
        await menuButton.click();
    }

    public async handleRichTextMenuOptionValue(optId: string) {
        const menuOption = this.page.getByTestId(`menu-bar-inputs`);
        await menuOption.waitFor({ state: 'visible' });
        return (await menuOption.getAttribute('data-current')) === optId;
    }
}

export default RichContentComponent;
