import { Locator, Page } from '@playwright/test';

class CanvasComponent {
    readonly page: Page;
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
        await this.page.click(`#${elementId}`);
    }
}

export default CanvasComponent;
