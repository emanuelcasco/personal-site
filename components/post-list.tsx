import React from 'react';

import PostPreview from './post-preview';

import IPost from '../types/post'

type Props = {
  posts: IPost[]
}
const MorePosts = ({ posts }: Props) => {
  return (
    <section className="body-font">
        <div className="mx-auto">
          <div className="flex flex-wrap -m-5">
            {posts.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </div>
        </div>
    </section>
  )
}

export default MorePosts;
