import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import LanguageSwitch from './language-switch';

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className="body-font mx-10">
      <div className="mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <Link as="/" href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 hover:text-blue-700">
            <img src="/assets/avatar.png" className="w-12 h-12 rounded-full" alt="Logo" />
            <span className="ml-3 text-xl font-bold">Emanuel Casco</span>
          </a>
        </Link>
        <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a className="hidden md:block hover:text-black">{t('Software Developer')}</a>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center justify-center text-gray-500">
          <Link href="/#About">
            <a className="mr-5 hover:text-gray-900">About</a>
          </Link>
          <Link href="/#Blog">
            <a className="mr-5 hover:text-gray-900">Blog</a>
          </Link>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
