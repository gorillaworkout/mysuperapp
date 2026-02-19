import type { EsmxOptions } from '@esmx/core';

function createCjsEsmWrapperPlugin(pkgExports: Record<string, string[]>) {
    const pkgNames = Object.keys(pkgExports);

    return class CjsEsmWrapperPlugin {
        apply(compiler: import('@rspack/core').Compiler) {
            compiler.hooks.thisCompilation.tap(
                'CjsEsmWrapperPlugin',
                (compilation) => {
                    compilation.hooks.processAssets.tap(
                        {
                            name: 'CjsEsmWrapperPlugin',
                            stage: compiler.webpack.Compilation
                                .PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE
                        },
                        (assets) => {
                            for (const [filename, source] of Object.entries(
                                assets
                            )) {
                                const matchedPkg = pkgNames.find((pkg) =>
                                    filename.startsWith(pkg + '.')
                                );
                                if (!matchedPkg) continue;

                                const content = source.source().toString();

                                const entryMatch =
                                    content.match(/}\((\d+)\);?\s*$/);
                                if (!entryMatch) continue;
                                const entryId = entryMatch[1];

                                const cacheMatch = content.match(
                                    /,(\w+)=\{\};!function/
                                );
                                if (!cacheMatch) continue;
                                const cacheVar = cacheMatch[1];

                                const namedExports = pkgExports[matchedPkg];
                                const exportLines = namedExports
                                    .map(
                                        (name) =>
                                            `export var ${name} = __cjs_mod__.${name};`
                                    )
                                    .join('\n');

                                const wrappedContent =
                                    content +
                                    `\nvar __cjs_mod__ = ${cacheVar}[${entryId}].exports;\nexport default __cjs_mod__;\n${exportLines}`;

                                compilation.updateAsset(
                                    filename,
                                    new compiler.webpack.sources.RawSource(
                                        wrappedContent
                                    )
                                );
                            }
                        }
                    );
                }
            );
        }
    };
}

const REACT_EXPORTS = [
    'Children',
    'Component',
    'Fragment',
    'Profiler',
    'PureComponent',
    'StrictMode',
    'Suspense',
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'act',
    'cloneElement',
    'createContext',
    'createElement',
    'createFactory',
    'createRef',
    'forwardRef',
    'isValidElement',
    'lazy',
    'memo',
    'startTransition',
    'unstable_act',
    'useCallback',
    'useContext',
    'useDebugValue',
    'useDeferredValue',
    'useEffect',
    'useId',
    'useImperativeHandle',
    'useInsertionEffect',
    'useLayoutEffect',
    'useMemo',
    'useReducer',
    'useRef',
    'useState',
    'useSyncExternalStore',
    'useTransition',
    'version'
];

const REACT_DOM_EXPORTS = [
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    'createPortal',
    'createRoot',
    'findDOMNode',
    'flushSync',
    'hydrate',
    'hydrateRoot',
    'render',
    'unmountComponentAtNode',
    'unstable_batchedUpdates',
    'unstable_renderSubtreeIntoContainer',
    'version'
];

export default {
    modules: {
        links: { 'ssr-npm-base': './node_modules/ssr-npm-base/dist' },
        imports: {
            '@esmx/router': 'ssr-npm-base/@esmx/router'
        },
        exports: [
            'pkg:react',
            'pkg:react-dom',
            'pkg:@esmx/router-react',
            'root:src/app-creator.ts',
            {
                'src/render-to-str': {
                    client: false,
                    server: './src/render-to-str.ts'
                }
            }
        ]
    },
    async devApp(esmx) {
        return import('@esmx/rspack').then((m) =>
            m.createRspackHtmlApp(esmx, {
                chain({ chain, buildTarget }) {
                    if (buildTarget === 'server' || buildTarget === 'client') {
                        chain.plugin('cjs-esm-wrapper').use(
                            createCjsEsmWrapperPlugin({
                                react: REACT_EXPORTS,
                                'react-dom': REACT_DOM_EXPORTS
                            })
                        );
                    }
                }
            })
        );
    }
} satisfies EsmxOptions;
