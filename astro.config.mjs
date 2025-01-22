import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
    site: "https://news-plus-plus.com",
    base: process.env.NODE_ENV === 'production' ? '' : 'news-plus-plus'
});