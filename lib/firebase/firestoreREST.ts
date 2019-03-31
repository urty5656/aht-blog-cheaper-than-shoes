import axios from 'axios';
import parseFirestore from 'firestore-parser';
import { tryP } from 'fluture';
import { map, prop } from 'ramda';
import { PostModel } from '../../models/blog';

const base = axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1beta1/projects/sort-me-yang/databases/(default)',
});

export const getBlogPost = (slug: string) =>
  tryP(() => base.get<{ fields: PostModel }>(`/documents/posts/${slug}`))
    .map(prop('data'))
    .map(prop('fields'))
    .map(parseFirestore);

export const getBlogPostList = () =>
  tryP(() =>
    base.get<{ documents: { fields: PostModel[] } }>('/documents/posts'),
  )
    .map(prop('data'))
    .map(prop('documents'))
    .map(map(prop('fields')))
    .map(parseFirestore);
