import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

import * as gtag from '../lib/gtag';

import 'nprogress/nprogress.css';
import '../styles/index.css';
import i18n from '../i18n';

const routeChangeStart = () => NProgress.start();
const routeChangeComplete = (url: URL) => {
  gtag.pageview(url);
  NProgress.done();
};
const routeChangeError = () => NProgress.done();

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    i18n.changeLanguage(router.locale);
    //Binding events.
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeComplete);
    Router.events.on('routeChangeError', routeChangeError);
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeComplete);
      Router.events.off('routeChangeError', routeChangeError);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default App;
