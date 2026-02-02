import { defineConfig } from '@esmx/rspack';

export default defineConfig({
    entry: {
        index: './src/index.ts',
        'pages/HomePage': './src/pages/HomePage.ts'
    },
    output: {
        path: './dist',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
});