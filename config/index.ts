export default {
  isProduction: process.env.IS_PRODUCTION === 'true',
  gtagId: process.env.GTAG_ID as string,
};
