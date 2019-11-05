import { T, TE, pipe } from '@@prelude';
import { updateTimeInfo } from '@/lib/firebase/firestore';
import { addFile } from '@/lib/firebase/storage';
import { CommonError } from '@/models/Common/error';
import { addMedia } from '@/models/media/detail';
import { getDimensions } from '@/utils/task/image';
import { sequenceS } from 'fp-ts/lib/Apply';

const getFileDownloadURL = (
  ref: firebase.storage.Reference,
): T.Task<string> => () => ref.getDownloadURL();

const toStorageInfo = (
  ref: firebase.storage.Reference,
): T.Task<{ src: string; ref: string }> =>
  sequenceS(T.task)({
    src: getFileDownloadURL(ref),
    ref: T.of(ref.fullPath),
  });

export const upload = (file: File): TE.TaskEither<CommonError, void> =>
  pipe(
    addFile(file.name, file),
    TE.chain(ref => TE.rightTask(toStorageInfo(ref))),
    TE.chain(fileInfo =>
      TE.rightTask(
        T.task.map(getDimensions(file), dim => ({
          ...dim,
          ...fileInfo,
          created: undefined,
          modified: undefined,
        })),
      ),
    ),
    TE.chain(media => TE.rightIO(updateTimeInfo(media))),
    TE.chain(addMedia),
  );
