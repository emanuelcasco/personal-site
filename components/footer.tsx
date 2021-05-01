import Link from 'next/link';

import SocialLinks from './social-links';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link as="/" href="/">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img
              loading="lazy"
              decoding="async"
              src="/assets/avatar.png"
              className="w-10 h-10 rounded-full"
              alt="Logo"
            />
          </a>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2021 Emanuel Casco
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <SocialLinks />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
