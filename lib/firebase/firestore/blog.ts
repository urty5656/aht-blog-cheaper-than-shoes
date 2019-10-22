import { PostModel } from '@/models/blog';
import { db } from '../firebase';
import { Collections } from './Collections';

const getBlogPostSnapshot = (slug: string) =>
  db
    .collection(Collections.Posts)
    .doc(slug)
    .get();

/**
 * Adds a blog post. Throws when the data's slug already exists.
 * @param data
 */
// [todo] Either
export const addBlogPost = async (data: PostModel) => {
  const doc = await getBlogPostSnapshot(data.slug);
  if (doc.exists) {
    throw 'Doc already exists';
  }
  return doc.ref.set(data);
};

/**
 * Updates a blog post. Throws when the data's slug does not exists.
 * @param data
 */
export const updateBlogPost = async (data: PostModel) => {
  const doc = await getBlogPostSnapshot(data.slug);
  if (!doc.exists) {
    throw 'Doc does not exist';
  }
  return doc.ref.update(data);
};

/**
 * Retrieves a blog post by a given slug. Throws when no such doc exists.
 * @param slug
 */
// [todo] Either
export const getBlogPost = async (slug: string): Promise<PostModel> => {
  const doc = await getBlogPostSnapshot(slug);
  if (!doc.exists) {
    throw `No doc ${slug}`;
  }
  return doc.data() as PostModel;
};

/**
 * Retrieves multiple blog posts.
 */
// [todo] Error handling, pagination
export const getBlogPostList = async (): Promise<readonly PostModel[]> => {
  const posts = await db
    .collection(Collections.Posts)
    .orderBy('created', 'desc')
    .get();
  return posts.docs.map(doc => doc.data() as PostModel);
};

export { db };
