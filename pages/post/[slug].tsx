import Header from '@/components/Header';
import PortableTextComponent from '@/components/PortableTextComponent';
import { sanityClient, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { Post } from '../../typings';
import { useState } from 'react';
import PostForm from '@/components/post/PostForm';

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {
  const [submitted, setSubmitted] = useState(false);

  const setIsSubmitted = () => setSubmitted(true);

  return (
    <main>
      <Header />

      <Image
        className="object-cover w-full h-40"
        src={urlFor(post.mainImage).url()}
        alt=""
        width={800}
        height={800}
      />

      <article className="max-w-3xl p-5 mx-auto">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.categories
            ?.map((i) => `${i.title}-${i.description}`)
            .reduce((prev, curr) => `${prev}、${curr}`)}
        </h2>

        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 rounded-full"
            src={urlFor(post.author.image).url()}
            alt=""
            width={800}
            height={800}
          />

          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText value={post.body} components={PortableTextComponent} />
        </div>
      </article>

      <hr className="max-w-3xl mx-auto my-5 border border-yellow-500" />

      {submitted ? (
        <div className="flex flex-col max-w-2xl p-10 mx-auto my-10 text-white bg-yellow-500">
          <h3 className="text-3xl font-bold">
            Thank you for sumitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <PostForm _id={post._id} setIsSubmitted={setIsSubmitted} />
      )}

      <div className="flex flex-col max-w-2xl gap-2 p-10 mx-auto my-10 shadow shadow-yellow-500">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}:</span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`
    *[_type == "post"]{
      _id,
      slug {
        current
      }
    }
  `;

  const posts: Post[] = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image
      },
      "comments": *[
        _type == "comment" &&
        post._ref == ^._id &&
        approved == true
      ],
      categories[] -> {
        title,
        description
      },
      mainImage,
      slug,
      body
    }
  `;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default Post;
