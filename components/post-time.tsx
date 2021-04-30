import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import DateFormatter from './date-formatter';
import IPost from '../types/post';

export const PostTimeData = ({
  date,
  readTime,
}: Pick<IPost, 'date' | 'readTime'>) => {
  const { t } = useTranslation('post');
  const { locale } = useRouter();
  return (
    <>
      <DateFormatter locale={locale} dateString={date} /> · {readTime}{' '}
      {t('readTime')}
    </>
  );
};
