import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import admonitions from 'remark-admonitions';

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(prism)
    .use(admonitions, {
      customTypes: {
        info: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"></path></svg>',
          emoji: 'ℹ️',
        },
        note: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19,4h-3V2h-2v2h-4V2H8v2H5C3.897,4,3,4.897,3,6v14c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2V6C21,4.897,20.103,4,19,4z M12,14H7v-2h5V14z M17,10H7V8h10V10z"></path></svg>',
          emoji: '✏️',
        },
        tip: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 20H15V22H9zM16.906 13.712C17.936 12.506 19 11.259 19 9c0-3.859-3.141-7-7-7S5 5.141 5 9c0 2.285 1.067 3.528 2.101 4.73.358.418.729.851 1.084 1.349.144.206.38.996.591 1.921H7.984v2h1.178 5.675 1.179v-2h-.79c.213-.927.45-1.719.593-1.925C16.171 14.572 16.545 14.135 16.906 13.712z"></path></svg>',
          emoji: '💡',
        },
        quote: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819L10.196 6.98c-1.37.274-2.323.813-2.833 1.604C7.05 9.071 6.947 9.591 6.925 10H9h1c.553 0 1 .447 1 1v7c0 1.103-.897 2-2 2H3c-.553 0-1-.447-1-1v-5l.003-2.919C1.994 10.97 1.804 8.34 3.691 6.292zM20 20h-6c-.553 0-1-.447-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819L21.196 6.98c-1.37.274-2.323.813-2.833 1.604C18.05 9.071 17.947 9.591 17.925 10H20h1c.553 0 1 .447 1 1v7C22 19.103 21.103 20 20 20z"></path></svg>',
          emoji: '🗣',
        },
        danger: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"></path></svg>',
          emoji: '🔥',
        },
        caution: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>',
          emoji: '☢️',
        },
      },
    })
    .use(html)
    .process(markdown);
  return result.toString();
}
