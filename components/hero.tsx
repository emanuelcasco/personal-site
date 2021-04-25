import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useInterval } from '../hooks';
import { getRandomValueBetween } from '../utils';

const COOL_WORDS_LIST =
  'Developer, Software Developer,Geek,Software Architect,Frontend Developer,Backend Developer,Tech Lead,Software Architect,Lead Developer,Programmer,Tester,Analyst,Writer,Blogger,Node.js Lover'
    .split(',');
const COOL_EMOJI_LIST = '👨🏽‍💻,👨🏽‍🏭,👨🏽‍🚀,🕵🏽‍♂️,👷🏽‍♂️,🥷🏽,🧙🏽‍♂️,🧙🏽‍♂️,🇦🇷'.split(',');
const COOL_COLOR_LIST = 'bg-blue-600,bg-pink-600,bg-black'.split(',');

const WORD_CHANGE_INTERVAL = 1_000;

function Hero() {
  const { t } = useTranslation();
  let [[selectedRoleWord, selectedRoleEmoji, selectedRoleColor], setRole] = useState([
    COOL_WORDS_LIST[0],
    COOL_EMOJI_LIST[0],
    COOL_COLOR_LIST[0]
  ]);

  useInterval(() => {
    setRole([
      COOL_WORDS_LIST[getRandomValueBetween(COOL_WORDS_LIST.length - 1, 0)],
      COOL_EMOJI_LIST[getRandomValueBetween(COOL_EMOJI_LIST.length - 1, 0)],
      COOL_COLOR_LIST[getRandomValueBetween(COOL_COLOR_LIST.length - 1, 0)],
    ])
  }, WORD_CHANGE_INTERVAL);

  return (
    <>
      <div className="-z-1 absolute inset-x-2/3 w-1/3 h-5/6 hero__background"></div>
      <div className="relative pt-10 pb-20 px-5 xl:px-0 mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="inline-flex items-center justify-center">
            <img src="/assets/avatar_photo.png" className="w-60 h-60 rounded-full mr-4" alt="avatar" />
          </div>
          <div className="flex flex-col inline-flex items-center justify-center text-center">
            <h2 className="pt-10 text-4xl lg:w-1/2 xl:w-full xl:text-5xl font-black f-f-l">
              👋 {t('Hey')}<br />Emanuel Casco
            </h2>
            <div className="f-f-r py-10 sm:pb-0">
              <h3 className="text-2xl">
                <p className="inline pr-2">{selectedRoleEmoji}</p>
                <p className={`${selectedRoleColor} inline text-white px-2 rounded-sm`}>{selectedRoleWord}</p>.
              </h3>
            </div>
          </div>
        </div>
        <div className="relative hidden xl:block">
          <img className="md:w-full lg:w-5/6 absolute top-10 right-0 -ml-24" src="/assets/logo.png" />
        </div>
      </div>
    </>
  );
}
export default Hero;
