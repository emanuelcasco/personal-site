import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next';

import DateFormatter from './date-formatter'
import IPost from '../types/post';

export const PostTimeData = ({
  date,
  readTime,
}: Pick<IPost, 'date' | 'readTime'>) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return <p><DateFormatter locale={locale} dateString={date} /> · {readTime} {t('min read')}</p>;
};
