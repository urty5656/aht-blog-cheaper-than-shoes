import { db } from '../firebase';
import { Collections } from './Collections';

import { MediaModel } from '@/models/media';

const getMediaSnapshot = (ref: string) =>
  db
    .collection(Collections.Media)
    .doc(ref)
    .get();

/**
 * Adds a media. Throws when the ref already exists.
 * @param data
 */
// [todo] Either
export const addMedia = async (data: MediaModel) => {
  const doc = await getMediaSnapshot(data.ref);
  if (doc.exists) {
    throw 'The media already exists';
  }
  return doc.ref.set(data);
};

export const updateMedia = async (data: MediaModel) => {
  const doc = await getMediaSnapshot(data.ref);
  if (!doc.exists) {
    throw 'The media does not exist';
  }
  return doc.ref.update(data);
};

/**
 * Retrieves a blog post by the given slug. Throws when no such doc exists.
 * @param slug
 */
// [todo] Either
export const getMedia = async (ref: string): Promise<MediaModel> => {
  const doc = await getMediaSnapshot(ref);
  if (!doc.exists) {
    throw `No media ${ref}`;
  }
  return doc.data() as MediaModel;
};

// [todo] Error handling
export const getMediaList = async (
  limit: number,
  last?: firebase.firestore.DocumentSnapshot,
): Promise<readonly firebase.firestore.DocumentSnapshot[]> => {
  let query = await db
    .collection(Collections.Media)
    .orderBy('created')
    .limit(limit);
  if (last) {
    query = query.startAfter(last);
  }

  const media = await query.get();

  if (media.empty) {
    return [];
  }
  return media.docs;
};

export { db };
