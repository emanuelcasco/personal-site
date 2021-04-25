import React from 'react';
import { useTranslation } from 'react-i18next';

import PostPreview from './post-preview';

import IPost from '../types/post'

type Props = {
  posts: IPost[]
}
const MorePosts = ({ posts }: Props) => {
  const { t } = useTranslation();
  return (
    <section className="body-font">
      <h2 className="mb-8 text-4xl md:text-4xl font-bold">{t('More Posts')}.</h2>
        <div className="px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            {posts.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </div>
        </div>
    </section>
  )
}

export default MorePosts;
