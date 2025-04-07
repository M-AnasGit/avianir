/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    options: {
        doNotFollow: {
            dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer', 'npm-bundled', 'npm-no-pkg'],
        },

        includeOnly: '^(app|services|components)',

        tsPreCompilationDeps: false,

        tsConfig: {
            fileName: './tsconfig.json',
        },

        externalModuleResolutionStrategy: 'yarn-pnp',

        progress: { type: 'performance-log' },

        reporterOptions: {
            archi: {
                collapsePattern: '^(app|services|components)/[^/]+',

                theme: {
                    modules: [
                        {
                            criteria: { collapsed: true },
                            attributes: { shape: 'tab' },
                        },
                        {
                            criteria: { source: '^app/[^/]+' },
                            attributes: { fillcolor: '#ffbdbd' },
                        },
                        {
                            criteria: { source: '^services/[^/]+' },
                            attributes: { fillcolor: '#aedaff' },
                        },
                        {
                            criteria: { source: '^components/[^/]+' },
                            attributes: { fillcolor: '#efefef' },
                        },
                    ],
                    graph: {
                        splines: 'ortho',
                        rankdir: 'TB',
                        ranksep: '1',
                    },
                },
            },
        },
    },
};
