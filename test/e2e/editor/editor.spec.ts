import { expect } from '../base-test';
import { test } from '../base-test';

test('Basic editor usage', async ({ editor }) => {
    await editor.goto();

    await editor.clickButton('sidebar-tabs-components');
    await editor.clickButton('components-default');
    const text_id_1 = await editor.$sidebar_content.dragComponentToCanvas('text', { x: 100, y: 100 });
    await editor.$canvas.selectElement(text_id_1);
    await editor.clickButton('sidebar-tabs-content');
    await editor.clickButton('content-tab-content');
    await editor.clickButton('edit-content');
    expect(await editor.$modal.isOpen()).toBeTruthy();
    await editor.$richContent.typeInRichInput('Hello, world!');
    await editor.$modal.closeModal();
    expect(await editor.$modal.isOpen()).toBeFalsy();
    expect(await editor.$canvas.getTextElementContent(text_id_1)).toBe('<p>Hello, world!</p>');

    await editor.clickButton('sidebar-tabs-components');
    await editor.clickButton('components-default');
    const text_id_2 = await editor.$sidebar_content.dragComponentToCanvas('text', { x: 100, y: 100 });
    await editor.$canvas.selectElement(text_id_2);
    await editor.clickButton('sidebar-tabs-content');
    await editor.clickButton('content-tab-content');
    await editor.clickButton('edit-content');
    expect(await editor.$modal.isOpen()).toBeTruthy();

    await editor.$richContent.typeInRichInput('console.log("Hello, world!");');

    await editor.$richContent.toggleRichTextMenuOption('code');
    await editor.$richContent.handleRichTextMenuOptionValue('code');

    await editor.$modal.closeModal();
    expect(await editor.$modal.isOpen()).toBeFalsy();
    expect(await editor.$canvas.getTextElementContent(text_id_2)).toBe(
        '<pre><code><span class="hljs-built_in">console</span>.<span class="hljs-built_in">log</span>(<span class="hljs-string">"Hello, world!"</span>);</code></pre>',
    );

    // add an image
    // move image between texts
    // delete image
    // undo
    // redo
    // go to layers
    // view/unview layers
    // save everything
    // reload page
    // check if everything is still there
    // edit palette
    // reload
    // check if new palette
    // go to text modify font size
    // save preset
    // reload
    // check if preset is there
    // use preset
    // TODO: add delete preset then test it
    // test devices
    // test preview
});
