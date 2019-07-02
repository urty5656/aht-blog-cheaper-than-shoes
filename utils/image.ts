export const getDimensions = (file: File) => {
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
