import { ElementTypes } from '@/features/editor/types';

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
        color: '#ffffff',
        backgroundColor: '#000000',
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
