import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.ts',
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
