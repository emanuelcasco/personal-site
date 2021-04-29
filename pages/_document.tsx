import Document, { Html, Head, Main, NextScript } from 'next/document';

import AnalyticsScript from '../components/AnalyticsScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <AnalyticsScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
