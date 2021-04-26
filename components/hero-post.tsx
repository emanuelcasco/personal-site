import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Button from './button';
import CoverImage from './cover-image';
import { PostTimeData } from './post-time';
import IPost from '../types/post';

const HeroPost = (post: Omit<IPost, 'author' | 'ogImage' | 'content'>) => {
  const { t } = useTranslation();
  return (
    <section className="py-10 lg:flex lg:justify-between">
      <div className="lg:flex">
        <div className="mb-3 lg:w-1/2">
          <CoverImage title={post.title} src={post.coverImage} slug={post.slug} />
        </div>
        <div className="w-full lg:pl-10 lg:w-1/2">
          <div className="mb-5">
            <p className="tracking-widest text-sm title-font text-gray-400 mb-1">
              <PostTimeData date={post.date} readTime={post.readTime} />
            </p>
            <h3 className="mb-3 text-2xl lg:text-3xl leading-tight font-semibold">
              <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
                <a className="hover:underline">{post.title}</a>
              </Link>
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">{post.excerpt}</p>
          </div>
          <Button as={`/blog/${post.slug}`} href="/blog/[slug]" text={t('Read More')} />
        </div>
      </div>
    </section>
  )
};

export default HeroPost;
