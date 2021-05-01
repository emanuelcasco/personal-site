import Head from 'next/head';
import { useTranslation } from 'react-i18next';

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

const Page404 = ({ allPosts }: Props) => {
  const { t } = useTranslation('notFound');

  return (
    <>
      <Head>
        <title>Emanuel Casco | 404</title>
      </Head>
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 p-10">
              <img
                loading="lazy"
                decoding="async"
                className="object-cover object-center rounded"
                alt="hero"
                src="/assets/logo_screaming.png"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {t('title')}
              </h1>
              <p className="mb-8 text-justify leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>
        </section>
        {allPosts.length > 0 && <PostList posts={allPosts} />}
      </Layout>
    </>
  );
};

export default Page404;
