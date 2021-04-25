import { AppProps } from 'next/app'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module

import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/index.css'
import '../i18n';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
