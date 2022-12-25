import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { sanityClient } from '@/lib/sanity';
import type { GetServerSideProps, NextPage } from 'next';
import { groq } from 'next-sanity';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex items-center justify-between py-10 bg-yellow-400 border-black border-y lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read, and connect
          </h1>
          <h2>
            It&#39;s easy and free to post your thinking on any topic and
            connect with millions of readers
          </h2>
        </div>

        <Image
          height={500}
          width={500}
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
          className="hidden object-contain h-32 md:inline-flex lg:h-full"
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = groq`
  *[_type == "post"]{
    _id,
    _createdAt,
    title,
    slug,
    author -> {
      name,
      image
    },
    categories[] -> {
      title,
      description
    },
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
