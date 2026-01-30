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
        noParse: /node_modules/,  // Important: Skip parsing node_modules
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
});