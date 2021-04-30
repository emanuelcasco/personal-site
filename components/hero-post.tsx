import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Button from './button';
import CoverImage from './cover-image';
import { PostTimeData } from './post-time';
import IPost from '../types/post';

const HeroPost = (post: Omit<IPost, 'content'>) => {
  const { t } = useTranslation('post');
  return (
    <section className="py-10 lg:flex lg:justify-between">
      <div className="lg:flex">
        <div className="relative mb-3 lg:w-1/2">
          <div className="ribbon text-2xl whitespace-no-wrap px-4">🔥</div>
          <CoverImage
            title={post.title}
            src={post.coverImage}
            slug={post.slug}
          />
        </div>
        <div className="md:flex lg:flex-col lg:pl-10 lg:w-1/2">
          <div className="sm:p1">
            <p className="text-sm title-font text-gray-400 mb-1">
              <PostTimeData date={post.date} readTime={post.readTime} />
            </p>
            <h3 className="mb-3 text-2xl lg:text-3xl font-semibold">
              <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
                <a className="hover:underline">{post.title}</a>
              </Link>
            </h3>
          </div>
          <div className="sm:p1 lg:w-full sm:w-full md:w-1/2">
            <p className="mb-5 text-gray-600 dark:text-gray-400 text-justify">
              {post.excerpt}
            </p>
            <div className="hidden lg:block">
              <Button
                as={`/blog/${post.slug}`}
                href="/blog/[slug]"
                text={t('readMoreBtn')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
