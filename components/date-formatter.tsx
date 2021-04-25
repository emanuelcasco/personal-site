import { parseISO, format } from 'date-fns';

import enUsLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';

type Props = {
  dateString: string;
  locale?: string;
}

const LocaleDictionary = {
  'en': enUsLocale,
  'es': esLocale,
};

type Locale = keyof typeof LocaleDictionary;

const DateFormatter = ({ dateString, locale }: Props) => {
  const date = parseISO(dateString);
  const options = locale ? { locale: LocaleDictionary[locale as Locale] } : {};
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy', options).toUpperCase()}</time>
};

export default DateFormatter;
