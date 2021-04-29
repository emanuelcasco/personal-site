import { GA_TRACKING_ID, TRACK_ANALYTICS } from '../lib/gtag';

const AnalyticsScript = () => {
  return (
    <>
      {TRACK_ANALYTICS && (
        /* Global Site Tag (gtag.js) - Google Analytics */
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
    </>
  );
};

export default AnalyticsScript;
