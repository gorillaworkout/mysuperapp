import { defineConfig } from '@esmx/rspack';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'pages/HomePage': './src/pages/HomePage.ts',
    'pages/ProductsPage': './src/pages/ProductsPage.ts',
    'pages/DashboardPage': './src/pages/DashboardPage.ts'
  },
  output: {
    path: './dist',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
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