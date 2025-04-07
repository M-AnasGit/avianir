import { Locator, Page } from '@playwright/test';

class ModalComponent {
    protected page: Page;
    readonly $modal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.$modal = page.getByTestId('modal-dialog');
    }

    /**
     * @returns Whether the modal is open.
     */
    public async isOpen() {
        return await this.page.isVisible('[data-testid="modal-dialog"]');
    }

    /**
     * Closes the modal.
     */
    public async closeModal() {
        await this.page.click('[data-testid="modal-close"]');
        await this.page.waitForSelector('[data-testid="modal-dialog"]', { state: 'hidden' });
    }
}

export default ModalComponent;
