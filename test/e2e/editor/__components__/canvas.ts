import { Locator, Page } from '@playwright/test';

class CanvasComponent {
    protected page: Page;
    readonly $canvas: Locator;

    constructor(page: Page) {
        this.page = page;
        this.$canvas = page.getByTestId('editor-canvas');
    }

    /**
     * Selects an element on the canvas by its ID.
     * @param elementId The ID of the element to select.
     */
    public async selectElement(elementId: string | undefined) {
        if (!elementId) {
            throw new Error('Element ID is required');
        }
        await this.$canvas.waitFor({ state: 'visible' });
        await this.page.click(`[id="${elementId}"]`);
    }

    /**
     * Gets the content of a text element on the canvas by its ID.
     * @param elementId The ID of the element to get the content of.
     * @returns The content of the element.
     */
    public async getTextElementContent(elementId: string | undefined): Promise<string> {
        if (!elementId) {
            throw new Error('Element ID is required');
        }

        const textElement = this.page.locator(`[id="${elementId}"]`);
        await textElement.waitFor({ state: 'visible' });
        const contentEditable = textElement.locator('div[class="tiptap ProseMirror"]');
        await contentEditable.waitFor({ state: 'visible' });
        return await contentEditable.evaluate((node) => node.innerHTML);
    }
}

export default CanvasComponent;
