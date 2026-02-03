import { defineConfig } from '@esmx/rspack';

export default defineConfig({
    client: {
        external: ['vue'], // Only externalize vue, bundle everything else
    },
    server: {
        external: ['vue'],
    },
});
