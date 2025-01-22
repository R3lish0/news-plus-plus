import { defineConfig } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
    site: "https://news-plus-plus.com",
    base: isProd ? '' : '/news-plus-plus/'
});