import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import Hero from '../components/hero';
import HeroPost from '../components/hero-post';
import PostList from '../components/post-list';
import Layout from '../components/layout';

import Post from '../types/post';

import { getAllPosts } from '../lib/posts-service';

type StaticProps = {
  locale: string;
};

type Props = {
  allPosts: Post[];
};

export const getStaticProps = async ({ locale }: StaticProps) => {
  const allPosts = getAllPosts(locale);
  return { props: { allPosts } };
};

const Index = ({ allPosts }: Props) => {
  const { t } = useTranslation();

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1, 7);

  return (
    <>
      <Head>
        <title>Emanuel Casco</title>
      </Head>
      <Layout>
        <Hero />
        <h2 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
          {t('My Blog')}.
        </h2>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            readTime={heroPost.readTime}
          />
        )}
        {morePosts.length > 0 && <PostList posts={morePosts} />}
      </Layout>
    </>
  );
};

export default Index;
