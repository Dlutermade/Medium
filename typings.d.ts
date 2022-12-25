export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
  categories: Categorie[];
  mainImage: string;
  slug: {
    current: string;
  };
  body: [TypedObject];
}

interface Categorie {
  title: string;
  description: string;
}

export interface Comment {
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
}
