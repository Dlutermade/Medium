import { urlFor } from '@/lib/sanity';
import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        className="max-w-5xl"
        src={urlFor(value).url()}
        width={800}
        height={800}
        alt=""
      />
    ),
  },
  marks: {
    link: ({ value, children }) =>
      value.href ? (
        <a href={value.href} className="text-blue-500 hover:underline">
          {children}
        </a>
      ) : (
        <div>{children}</div>
      ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="my-5 text-2xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-5 text-xl font-bold">{children}</h2>
    ),
  },
};

export default components;
