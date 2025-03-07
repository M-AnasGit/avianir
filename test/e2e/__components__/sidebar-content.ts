import { Locator, Page } from '@playwright/test';

class SidebarContentComponent {
    readonly page: Page;
    readonly $content: Locator;

    constructor(page: Page) {
        this.page = page;
        this.$content = page.getByTestId('editor-sidebar-content');
    }

    /**
     * Expands a specific accordion by its name.
     * @param accordionName The visible name of the accordion to expand.
     */
    public async expandAccordion(accordionName: string) {
        await this.$content.waitFor({ state: 'visible' });
        await this.$content.getByTestId(accordionName).click();
    }

    /**
     * Drags a component from the sidebar to the canvas at a specific position.
     * @param componentName The visible name of the component to drag.
     * @param position The position to drag the component to.
     */
    public async dragComponentToCanvas(componentName: string, position: { x: number; y: number }) {
        await this.$content.waitFor({ state: 'visible' });
        const $component = this.$content.getByTestId(`component-item-${componentName}`);
        const $canvas = this.page.getByTestId('editor-canvas');

        const existing_components = new Set(
            await this.page.evaluate(() =>
                Array.from(document.querySelectorAll('[data-testid="editor-canvas"] [id]')).map((el) => el.id),
            ),
        );

        await $component.dragTo($canvas, {
            targetPosition: position,
        });

        const new_components = new Set(
            await this.page.evaluate(() =>
                Array.from(document.querySelectorAll('[data-testid="editor-canvas"] [id]')).map((el) => el.id),
            ),
        );

        return Array.from(new_components).find((id) => !existing_components.has(id));
    }
}

export default SidebarContentComponent;
