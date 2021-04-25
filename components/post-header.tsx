import { useRouter } from 'next/router';
import Container from './container';
import CoverImage from './cover-image';
import { PostTimeData } from './post-time';
import PostTitle from './post-title';

type Props = {
  title: string;
  coverImage: string;
  excerpt: string;
  readTime: string;
  date: string;
}

const PostHeader = ({ title, coverImage, excerpt, date, readTime }: Props) => {
  return (
    <Container>
      <PostTitle>{title}</PostTitle>
      <p className="mb-5 text-lg text-gray-600">{excerpt}</p>
      <div className="flex mb-5 text-sm text-gray-500">
        <p className="tracking-widest text-sm title-font text-gray-400 mb-1">
          <PostTimeData date={date} readTime={readTime} />
        </p>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    </Container>
  );
};

export default PostHeader;
