import firebase from 'firebase/app';
import { tryP } from 'fluture';
import { PostModel } from '../../models/blog';

export const instanceF = tryP(async () => {
  await import('firebase/firestore');

  return firebase.firestore();
});

export const addBlogPost = (data: PostModel) => {
  instanceF.chain(
    instance => tryP(() => instance.collection('post').add(data))
  ).fork(
    error => {
      alert('Couldn\'t add');
      console.error(error);
    },
    () => {
      alert('Added')
    }
  )
};
