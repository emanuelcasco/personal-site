import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

type Items = Record<string, string>;

const WORDS_PER_SECOND = 250 / 60;

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(locale: string) {
  return fs.readdirSync(join(postsDirectory, locale));
}
export default function calculateReadingTime(content: string) {
  let images = 0;
  let imageSecs = 0;
  let imageFactor = 12;

  const regex = /\w/;
  let words = content.split(' ').filter(word => {
    if (word.includes('<img')) images += 1
    return regex.test(word)
  }).length

  const imageAdjust = images * 4;

  while (images) {
    imageSecs += imageFactor
    if (imageFactor > 3) imageFactor -= 1
    images -= 1
  }

  const minutes = Math.ceil(((words - imageAdjust) / WORDS_PER_SECOND + imageSecs) / 60)
  return minutes
}

export function getPostBySlug(
  slug: string,
  locale: string,
  fields: string[] = []
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, locale, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") items[field] = realSlug;
    if (field === "content") items[field] = content;
    if (field === "readTime") {
      items[field] = `${calculateReadingTime(content)}`;
    }
    if (data[field]) items[field] = data[field];
  });

  return items;
}

export const getAllPosts = (fields: string[] = [], locale: string = "en") =>
  getPostSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
