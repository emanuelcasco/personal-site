import Link from 'next/link'

type Props = {
  as: string
  href: string
  text: string
}

const Button = ({
  as,
  href,
  text,
}: Props) => {
  return (
    <Link as={as} href={href}>
      <a
        className="inline-block bg-blue-700 hover:bg-white hover:text-blue-700 border hover:border-blue-700 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors lg:mb-0"
      >{text}</a>
    </Link>
  );
}

export default Button;
