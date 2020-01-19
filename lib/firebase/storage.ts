import { CommonError, error } from '@/models/Common/error';
import { TE, pipe, IO } from '@/prelude';
import { getNow } from '@/utils/io/date';

import { storage } from './firebase';

const storageRef = storage.ref();

const putFile = (
  ref: firebase.storage.Reference,
  file: File,
): TE.TaskEither<CommonError, firebase.storage.Reference> =>
  TE.tryCatch(
    async () => {
      await ref.put(file);
      return ref;
    },
    e => error('unknown', e),
  );

/** Upload a file to storage with the name, postfixed with current timestamp. */
export const addFile = (
  refName: string,
  file: File,
): TE.TaskEither<CommonError, firebase.storage.Reference> =>
  pipe(
    getNow,
    IO.map(now => storageRef.child(`${refName}-${now}`)),
    TE.rightIO,
    TE.chain(ref => putFile(ref, file)),
  );

/** Delete a file from storage. */
export const deleteFile = (refName: string): TE.TaskEither<CommonError, void> =>
  TE.tryCatch(
    () => storageRef.child(refName).delete(),
    e => error('unknown', e),
  );
