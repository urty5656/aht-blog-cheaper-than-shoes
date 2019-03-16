import firebase from 'firebase/app';
import { of, reject, tryP } from 'fluture';
import { tap } from 'ramda';
import { PostModel } from '../../models/blog';

export const instanceF = tryP(async () => {
  await import('firebase/firestore');

  return firebase.firestore();
});

const getBlogPostSnapshot = (slug: string) =>
  instanceF.chain(instance =>
    tryP(() =>
      instance
        .collection('posts')
        .doc(slug)
        .get(),
    ),
  );

/**
 * Add a blog post. Rejects when the slug already exists.
 * @param data
 */
export const addBlogPost = (data: PostModel) =>
  getBlogPostSnapshot(data.slug)
    // check existence
    .chain<firebase.firestore.DocumentSnapshot>(doc =>
      doc.exists ? reject('Doc already exists') : of(doc),
    )
    // create
    .chain(doc => tryP(() => doc.ref.set(data)))
    .bimap(tap(console.error), tap(console.log));

/**
 * Retrieve a blog post by given slug. Rejects when no such doc exists.
 * @param slug
 */
export const getBlogPost = (slug: string) =>
  getBlogPostSnapshot(slug)
    // check existence
    .chain<firebase.firestore.DocumentSnapshot>(doc =>
      doc.exists ? of(doc) : reject(`No doc for ${slug}`),
    );
