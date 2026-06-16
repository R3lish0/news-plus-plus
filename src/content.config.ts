import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const articleCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/article' }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        date: z.string(),
        img: z.string()
    })
});

export const collections = {
  'article': articleCollection,
};