import {
  deleteData,
  getData,
  filterFound,
  filterNotFound,
  writeData,
} from '@/lib/firebase/firestore';
import { deleteFile } from '@/lib/firebase/storage';
import { Collections } from '@/models/Collections';
import { array } from 'fp-ts/lib/Array';
import { constVoid } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { CommonError } from '../Common/error';
import { MediaModel } from './model';

const fetchMedia = getData(Collections.Post);

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
const deleteRelatedEntries = (doc: firebase.firestore.DocumentSnapshot) =>
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
