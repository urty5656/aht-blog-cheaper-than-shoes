import {
  deleteData,
  filterFound,
  filterNotFound,
  getData,
  writeData,
} from '@/lib/firebase/firestore';
import { deleteFile } from '@/lib/firebase/storage';
import { Collections } from '@/models/Collections';
import { TE } from '@/prelude';

import { array } from 'fp-ts/lib/Array';
import { constVoid } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';

import { CommonError } from '../Common/error';
import { MediaModel } from './model';

const fetchMedia = getData(Collections.Media);

export const addMedia = (data: MediaModel): TE.TaskEither<CommonError, void> =>
  pipe(
    fetchMedia(data.ref),
    TE.chain(filterFound),
    TE.chain(writeData(data, true)),
  );

export const updateMedia = (
  data: MediaModel,
): TE.TaskEither<CommonError, void> =>
  pipe(
    fetchMedia(data.ref),
    TE.chain(filterNotFound),
    TE.chain(writeData(data)),
  );

const parallel = array.sequence(TE.taskEither);
const deleteRelatedEntries = (
  doc: firebase.firestore.DocumentSnapshot,
): TE.TaskEither<CommonError, void[]> =>
  parallel([deleteFile((doc.data() as MediaModel).ref), deleteData(doc.ref)]);

export const deleteMedia = (
  data: MediaModel,
): TE.TaskEither<CommonError, void> =>
  pipe(
    fetchMedia(data.ref),
    TE.chain(filterNotFound),
    TE.chain(deleteRelatedEntries),
    TE.map(constVoid),
  );

export const getMedia = (ref: string): TE.TaskEither<CommonError, MediaModel> =>
  pipe(
    fetchMedia(ref),
    TE.chain(filterNotFound),
    TE.map(doc => doc.data() as MediaModel),
  );
