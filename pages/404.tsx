import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import PostList from '../components/post-list';
import Layout from '../components/layout';
import SectionSeparator from '../components/section-separator';

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

const Page404 = ({ allPosts }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Emanuel Casco | 404</title>
      </Head>
      <Layout>
        <div className="grid lg:grid-cols-2 gap-1 p-10">
          <div>
            <img className="xs:w-3/6 sm:w-3/6 md:w-5/6 lg:w-4/6" src="/assets/logo_screaming.png" />
          </div>
          <div className="-mr-10">
            <h2 className="mb-8 text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
              404
              <br/>
              {t('Not Found')}.
            </h2>
            <p className="text-md text-lg leading-relaxed mb-5">
              {t('NotFoundText')}.
            </p>
          </div>
        </div>
        <SectionSeparator />
        {allPosts.length > 0 && <PostList posts={allPosts} />}
      </Layout>
    </>
  )
}

export default Page404;
