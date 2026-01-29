import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.tsx',
    'layout/MainLayout': './src/layout/MainLayout.tsx'
  },
  output: {
    path: './dist',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3000,
    static: {
      directory: './dist'
    },
    historyApiFallback: true
  }
});