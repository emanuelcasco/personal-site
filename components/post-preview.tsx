import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PostTimeData } from './post-time';

import IPost from '../types/post'

type Props = {
  post: IPost
}
const PostPreview = ({ post }: Props) => {
  const { locale } = useRouter();

  return (
    <div className="p-5 md:w-1/2 lg:w-1/3">
      <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
        <div className="cursor-pointer h-full overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={post.coverImage} alt="blog" />
          <div className="py-6">
            <p className="tracking-widest text-xs title-font text-gray-400 mb-1">
              <PostTimeData date={post.date} readTime={post.readTime} />
            </p>
            <h2 className="title-font text-lg font-bold text-gray-900 mb-3">{post.title}</h2>
            <p className="leading-relaxed text-gray-600  mb-3">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostPreview;
