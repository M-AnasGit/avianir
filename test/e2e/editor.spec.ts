import { test } from './base';

test('Basic editor usage', async ({ editor }) => {
    await editor.goto();
    await editor.$sidebar_tabs.clickTab('components');
    await editor.$sidebar_content.expandAccordion('default');
    const text_id = await editor.$sidebar_content.dragComponentToCanvas('text', { x: 100, y: 100 });
    await editor.$canvas.selectElement(text_id);
    await editor.$sidebar_tabs.clickTab('content');
    await editor.$sidebar_content.expandAccordion('typography');
});
