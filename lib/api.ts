import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import markdownReadingTime from './markdown-reading-time';

const MARKDOWN_EXTENSION = '.md'
const POSTS_DIRECTORY = join(process.cwd(), '_posts');

const getPostSlugs = (lang: string) =>
  fs.readdirSync(join(POSTS_DIRECTORY, lang))
    .filter(filename => filename.includes(MARKDOWN_EXTENSION))
    .map(filename => filename.replace(MARKDOWN_EXTENSION, ''));

export const getPostBySlug = (slug: string, locale: string) => {
  const fullPath = join(POSTS_DIRECTORY, locale, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    content: content,
    readTime: markdownReadingTime(content).minutes,
    date: data.date,
    ...data
  };
};

export const getAllPosts = (locale: string = "en") =>
  getPostSlugs(locale)
    .map(slug => getPostBySlug(slug, locale))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
