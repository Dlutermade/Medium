import { sanityClient } from '@/lib/sanity';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await sanityClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    res.status(500).json({ message: "Couldn't submit comment", err });
  }

  console.log('Comment submitted');
  res.status(200).json({ message: true });
};

export default handler;
