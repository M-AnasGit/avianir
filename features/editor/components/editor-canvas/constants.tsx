import { EditorElement, ElementTypes } from '@/features/editor/types';

export const DEFAULT_STYLES: Record<ElementTypes, React.CSSProperties> = {
    container: {
        height: '100px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
    },
    text: {
        width: '100%',
        fontSize: '16px',
        lineHeight: '100%',
        color: 'var(--default-text)',
    },
    table: {
        width: '100%',
        fontSize: '16px',
        lineHeight: '100%',
        color: 'var(--default-text)',
        borderCollapse: 'collapse',
        borderSpacing: '0',
    },
    image: { height: '100px', width: '100px' },
    video: { height: '100px', width: '100px' },
    audio: { width: '100%' },
    form: { width: '100%' },
    input: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '16px',
        paddingBottom: '16px',
    },
    radio: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '16px',
        paddingBottom: '16px',
    },
    checkbox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '16px',
        paddingBottom: '16px',
    },
};

export const DEFAULT_FORM_TEXT_STYLES: Record<string, React.CSSProperties> = {
    title: {
        fontSize: '18px',
        lineHeight: '100%',
        color: 'var(--default-text)',
    },
    description: {
        fontSize: '14px',
        lineHeight: '100%',
        color: 'var(--default-text)',
    },
    submit_btn: {
        color: 'var(--default-btn-text)',
        backgroundColor: 'var(--default-btn-background)',
        justifyContent: 'start',
    },
    label: {
        fontSize: '14px',
        lineHeight: '100%',
        color: 'var(--default-text)',
    },
    placeholder: {
        fontSize: '14px',
        lineHeight: '100%',
        color: 'var(--default-text)',
        backgroundColor: 'var(--default-input-background)',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '8px',
        paddingBottom: '8px',
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--default-input-border)',
    },
};

export const DEFAULT_FORM_CONTENT: EditorElement['formContent'] = {
    form: {
        title: {
            value: '<p><strong>Sample form title</strong></p>',
            style: DEFAULT_FORM_TEXT_STYLES['title'],
        },
        description: {
            value: '<p>Sample form description</p>',
            style: DEFAULT_FORM_TEXT_STYLES['description'],
        },
        submit_btn: {
            value: 'Submit',
            style: DEFAULT_FORM_TEXT_STYLES['submit_btn'],
        },
    },
    input: {
        label: {
            value: 'Input label',
            style: DEFAULT_FORM_TEXT_STYLES['label'],
        },
        placeholder: {
            value: 'Input placeholder',
            style: DEFAULT_FORM_TEXT_STYLES['placeholder'],
        },
        answer: {
            value: '',
            exact: true,
        },
        config: {
            rows: 1,
        },
    },
    radio_checkbox: {
        label: {
            value: 'Radio/Checkbox label',
            style: DEFAULT_FORM_TEXT_STYLES['label'],
        },
        options: [
            {
                value: {
                    value: 'Option 1',
                    style: DEFAULT_FORM_TEXT_STYLES['label'],
                },
                is_default: true,
                correct: true,
            },
            {
                value: {
                    value: 'Option 2',
                    style: DEFAULT_FORM_TEXT_STYLES['label'],
                },
                is_default: false,
                correct: false,
            },
            {
                value: {
                    value: 'Option 3',
                    style: DEFAULT_FORM_TEXT_STYLES['label'],
                },
                is_default: false,
                correct: false,
            },
        ],
    },
};

export const DUMMY_CONTENT: Record<string, string> = {
    text: '<p>Text</p>',
    table: `
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding: 8px;">Header 1</th>
                    <th style="padding: 8px;">Header 2</th>
                    <th style="padding: 8px;">Header 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 8px;">Row 1, Col 1</td>
                    <td style="padding: 8px;">Row 1, Col 2</td>
                    <td style="padding: 8px;">Row 1, Col 3</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">Row 2, Col 1</td>
                    <td style="padding: 8px;">Row 2, Col 2</td>
                    <td style="padding: 8px;">Row 2, Col 3</td>
                </tr>
            </tbody>
        </table>
    `,
};
