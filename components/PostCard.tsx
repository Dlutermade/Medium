import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { Post } from '../typings';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="overflow-hidden border rounded-lg group">
      <Image
        className="object-cover w-full transition-transform duration-200 ease-in-out h-60 group-hover:scale-105"
        src={urlFor(post.mainImage).url()}
        alt=""
        width={800}
        height={800}
      />
      <div className="flex justify-between p-5 bg-white">
        <div>
          <p className="text-lg font-bold">{post.title}</p>
          <p className="text-xs">
            {post.categories
              ?.map((i) => `${i.title}-${i.description}`)
              .reduce((prev, curr) => `${prev}、${curr}`)}
          </p>
        </div>

        <Image
          className="w-12 h-12 rounded-full"
          src={post.author && urlFor(post.author.image).url()}
          alt=""
          width={800}
          height={800}
        />
      </div>
    </div>
  );
};

export default PostCard;
