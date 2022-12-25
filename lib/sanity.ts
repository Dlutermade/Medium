import { ClientConfig, createClient } from 'next-sanity';

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-12-25',
  useCdn: process.env.NODE_ENV === 'production',
};

const sanityClient = createClient(config);

const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(sanityClient).image(source);

export { sanityClient, urlFor };
