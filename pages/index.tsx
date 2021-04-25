import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import Container from '../components/container';
import Header from '../components/header';
import Hero from '../components/hero';
import HeroPost from '../components/hero-post';
import PostList from '../components/post-list';
import Layout from '../components/layout';

import Post from '../types/post';

import { getAllPosts } from '../lib/api';

type StaticProps = {
  locale: string;
}

type Props = {
  allPosts: Post[];
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'readTime',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ], locale);
  return { props: { allPosts } };
}

const Index = ({ allPosts }: Props) => {
  const { t } = useTranslation();

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Layout>
        <Head>
          <title>Emanuel Casco</title>
        </Head>
        <Header />
        <Container>
          <Hero />
          <h2 id="Blog" className="mb-8 text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
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
        </Container>
      </Layout>
    </>
  )
}

export default Index;
