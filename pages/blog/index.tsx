import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import PostList from '../../components/post-list';
import Layout from '../../components/layout';
import Post from '../../types/post';
import { getAllPosts } from '../../lib/posts-service';

type StaticProps = {
  locale: string;
};

type Props = {
  allPosts: Post[];
};

export const getStaticProps = async ({ locale }: StaticProps) => {
  return { props: { allPosts: getAllPosts(locale) } };
};

const Blog = ({ allPosts }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Emanuel Casco | Blog</title>
      </Head>
      <Layout>
        <h2 className="my-10 text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
          {t('My Blog')}.
        </h2>
        {allPosts.length > 0 && <PostList posts={allPosts} />}
      </Layout>
    </>
  );
};

export default Blog;
