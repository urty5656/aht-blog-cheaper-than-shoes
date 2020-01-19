import { PostModel } from '@/models/post/model';
import { IO } from '@/prelude';

import { action, observable } from 'mobx';
import { EditorState } from 'prosemirror-state';
import { createContext } from 'react';

import { MediaStore } from './partial/media';

export type PostModelOptionalSlug = Omit<PostModel, 'slug'> & {
  slug: string | null;
};

export class WriteStore {
  @observable
  post: PostModelOptionalSlug = {
    public: false,
    title: '',
    slug: null,
    content: {},
    contentHTML: '',
  };

  @observable
  isModalOpened: boolean = false;

  @observable
  isLoading: boolean = false;

  // Create (false) or Update (true)
  readonly media = new MediaStore();

  constructor(readonly isUpdating: boolean) {}

  /**
   * Set a post for editing.
   */
  @action
  setPost = (post: PostModelOptionalSlug): void => void (this.post = post);

  @action
  setPublic = (public_: boolean): void => void (this.post.public = public_);

  @action
  setSlug = (slug: string): void => void (this.post.slug = slug);

  @action.bound
  setContents(content: EditorState, contentHTML: string): void {
    this.post.content = content.toJSON();
    this.post.contentHTML = contentHTML;
  }

  @action
  setLoading = (val: boolean): IO.IO<void> => () => (this.isLoading = val);

  @action
  toggleModal: IO.IO<void> = () => (this.isModalOpened = !this.isModalOpened);
}

export const writeStoreCtx = createContext<WriteStore>(null!);
