import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import { MathExtension } from './custom-extensions/maths';

export const text_extensions = [
    TextStyle,
    Color,
    Underline,
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
            try {
                // construct URL
                const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

                // use default validation
                if (!ctx.defaultValidate(parsedUrl.href)) {
                    return false;
                }

                // disallowed protocols
                const disallowedProtocols = ['ftp', 'file', 'mailto'];
                const protocol = parsedUrl.protocol.replace(':', '');

                if (disallowedProtocols.includes(protocol)) {
                    return false;
                }

                // only allow protocols specified in ctx.protocols
                const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));

                if (!allowedProtocols.includes(protocol)) {
                    return false;
                }

                // disallowed domains
                const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
                const domain = parsedUrl.hostname;

                if (disallowedDomains.includes(domain)) {
                    return false;
                }

                // all checks have passed
                return true;
            } catch {
                return false;
            }
        },
    }),
    CodeBlockLowlight.configure({
        lowlight: createLowlight(all),
    }),
    MathExtension,
];

export const table_extensions = [
    Table.configure({
        resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
];

export const languages: { label: string; value: string }[] = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Python', value: 'python' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'SCSS', value: 'scss' },
    { label: 'JSON', value: 'json' },
    { label: 'YAML', value: 'yaml' },
    { label: 'SQL', value: 'sql' },
    { label: 'GraphQL', value: 'graphql' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'Bash', value: 'bash' },
    { label: 'Shell', value: 'shell' },
    { label: 'C', value: 'c' },
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Java', value: 'java' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'PHP', value: 'php' },
];
