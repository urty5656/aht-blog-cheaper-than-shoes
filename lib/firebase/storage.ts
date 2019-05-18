import { storage } from './firebase';

const storageRef = storage.ref();

export const addImage = async (file: File, refName: string) => {
  const ref = storageRef.child(refName);

  await ref.put(file);
  return ref;
};

export const addBlogImage = async (file: File) => {
  const date = new Date()
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, ''); // 190520
  const name = `blog/${date}/${file.name}`;

  return addImage(file, name);
};

export const deleteImage = async (refName: string) =>
  await storageRef.child(refName).delete();
