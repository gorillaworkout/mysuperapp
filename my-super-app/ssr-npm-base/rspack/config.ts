// Router configuration
import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'router/index': './src/router/index.ts', 
    'core/index': './src/core/index.ts',
    'class-state/index': './src/class-state/index.ts',
    'fetch/index': './src/fetch/index.ts'
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
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
});