import axios from 'axios';
import { tryP } from 'fluture';
import { prop } from 'ramda';
import { PostModel } from '../../models/blog';
import parseFirestore from 'firestore-parser';

const base = axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1beta1/projects/sort-me-yang/databases/(default)',
});

export const getBlogPost = (slug: string) =>
  tryP(() => base.get<{ fields: PostModel }>(`/documents/posts/${slug}`))
    .map(prop('data'))
    .map(prop('fields'))
    .map(parseFirestore);
