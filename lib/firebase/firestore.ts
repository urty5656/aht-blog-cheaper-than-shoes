import { PostModel } from '../../models/blog';
import { db } from './firebase';

const getBlogPostSnapshot = (slug: string) =>
  db
    .collection('posts')
    .doc(slug)
    .get();

/**
 * Add a blog post. Throws when the slug already exists.
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
 * Retrieve a blog post by given slug. Throws when no such doc exists.
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

// [todo] Error handling
export const getBlogPostList = async (): Promise<readonly PostModel[]> => {
  const posts = await db.collection('posts').get();
  return posts.docs.map(doc => doc.data() as PostModel);
};

export { db };
