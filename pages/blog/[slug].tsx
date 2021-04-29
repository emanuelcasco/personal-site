import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';

import PostBody from '../../components/post-body';
import PostAuthor from '../../components/post-author';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';

import {
  getPostBySlug,
  getAllPosts,
  markdownToHtml,
} from '../../lib/posts-service';
import PostType from '../../types/post';

type Props = {
  locale: string;
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

type StaticPropsParams = {
  locale: string;
  params: {
    slug: string;
  };
};
type StaticPathsParams = {
  locales: string[];
};

export async function getStaticProps({ params, locale }: StaticPropsParams) {
  const post = getPostBySlug(params.slug, locale);
  return {
    props: {
      post: { ...post, content: await markdownToHtml(post.content || '') },
    },
  };
}

export async function getStaticPaths({ locales }: StaticPathsParams) {
  let paths: any[] = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    paths = paths.concat(
      posts.map((post) => ({
        params: { slug: post.slug },
        locale,
      }))
    );
  }
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ post, preview }: Props) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Emanuel Casco | {post.title}</title>
        <meta property="og:image" content={post.coverImage} />
      </Head>
      <Layout preview={preview}>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <article className="mb-32">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              excerpt={post.excerpt}
              readTime={post.readTime}
            />
            <PostBody content={post.content} />
            <PostAuthor />
          </article>
        )}
      </Layout>
    </>
  );
};

export default Post;
