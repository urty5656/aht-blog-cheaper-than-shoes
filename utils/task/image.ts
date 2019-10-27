import * as T from 'fp-ts/lib/Task';

export const getDimensions = (
  file: File,
): T.Task<{ width: number; height: number }> => () => {
  const fileReader = new FileReader();

  const result = new Promise<{ width: number; height: number }>(resolve => {
    fileReader.onload = () => {
      const image = new Image();
      image.onload = () =>
        resolve({
          width: image.width,
          height: image.height,
        });
      image.src = fileReader.result as string;
    };
  });

  fileReader.readAsDataURL(file);

  return result;
};
