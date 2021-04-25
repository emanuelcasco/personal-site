import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Button from './button';
import CoverImage from './cover-image';
import { PostTimeData } from './post-time';
import IPost from '../types/post';

const HeroPost = (post: Omit<IPost, 'author' | 'ogImage' | 'content'>) => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="mb-8 md:mb-10">
        <CoverImage title={post.title} src={post.coverImage} slug={post.slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight font-semibold">
            <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
              <a className="hover:underline">{post.title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <p className="tracking-widest text-sm title-font text-gray-400 mb-1">
              <PostTimeData date={post.date} readTime={post.readTime} />
            </p>
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-5 overflow-clip">{post.excerpt}</p>
          <Button as={`/posts/${post.slug}`} href="/posts/[slug]" text={t('Read More')} />
        </div>
      </div>
    </section>
  )
};

export default HeroPost;
