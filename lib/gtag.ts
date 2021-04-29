import config from '../config';

export const GA_TRACKING_ID = config.gtagId;
export const TRACK_ANALYTICS = config.isProduction;

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// 📚 Read more: https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, { page_path: url });
};

// 📚 Read more: https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
