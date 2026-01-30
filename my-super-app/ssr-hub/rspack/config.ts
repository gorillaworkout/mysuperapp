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
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  },
  devServer: {
    port: 3000,
    static: {
      directory: './dist'
    },
    historyApiFallback: true
  }
});
