import { test as base } from '@playwright/test';
import EditorPage from './editor/editor-page';

type Fixtures = {
    editor: EditorPage;
};

export const test = base.extend<Fixtures>({
    editor: async ({ page }, use) => {
        const editor = new EditorPage(page);
        await use(editor);
    },
});

export { expect } from '@playwright/test';
