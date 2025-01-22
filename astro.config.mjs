import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
    site: "https://news-plus-plus.com",
    base: import.meta.env.PROD ? '' : 'news-plus-plus'
});