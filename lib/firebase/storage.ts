import { storage } from './firebase';

const storageRef = storage.ref();

/**
 * Uploads an image. Automatically prefixes the refName with the current date.
 * @param file An image to upload.
 * @param refName An identifier.
 */
export const addImage = async (file: File, refName: string) => {
  const now = new Date().toISOString().slice(0, 10);
  const ref = storageRef.child(`${refName}-${now}`);

  await ref.put(file);
  return ref;
};

/**
 * Deletes an image.
 * @param refName An identifier for the image to delete.
 */
export const deleteImage = async (refName: string) =>
  await storageRef.child(refName).delete();
