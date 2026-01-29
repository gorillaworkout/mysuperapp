import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'pages/HomePage': './src/pages/HomePage.ts',
    'pages/ServicesPage': './src/pages/ServicesPage.ts',
    'pages/SettingsPage': './src/pages/SettingsPage.ts'
  },
  output: {
    path: './dist',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': './src'
    }
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