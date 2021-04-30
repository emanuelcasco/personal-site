import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const languages: [string, string][] = [
  ['en', '🇬🇧'],
  ['es', '🇦🇷'],
];

const LanguageSwitch = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleLocaleChange = ({ target }: ChangeEvent<{ value: string }>) =>
    i18n.changeLanguage(target.value) &&
    router.push(router.route, router.asPath, { locale: target.value });

  return (
    <>
      <div className="relative inline-flex">
        <svg
          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fillRule="nonzero"
          />
        </svg>
        <select
          name="language-picker"
          defaultValue={router.locale}
          className="text-2xl text-gray-600 h-10 pl-5 pr-10 bg-transparent hover:border-gray-400 focus:outline-none appearance-none"
          onChange={handleLocaleChange}
        >
          {languages.map(([locale, flag]) => (
            <option key={locale} value={locale}>
              {flag}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LanguageSwitch;
