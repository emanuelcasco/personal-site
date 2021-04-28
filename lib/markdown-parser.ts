import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism';
import admonitions from 'remark-admonitions';

import admonitionsConfig from './admonitions';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(prism)
    .use(admonitions, admonitionsConfig)
    .use(html)
    .process(markdown)
  return result.toString()
}
