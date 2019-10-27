import { PostModel } from '@/models/Blog/model';
import { IO } from 'fp-ts/lib/IO';
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
  isSubmitting: boolean = false;

  // Create (false) or Update (true)
  private readonly media = new MediaStore();

  constructor(readonly isUpdating: boolean) {}

  get MediaStore() {
    return this.media;
  }

  /**
   * Set a post for editing.
   */
  @action.bound
  setPost(post: PostModelOptionalSlug) {
    this.post = post;
  }

  @action.bound
  setPublic(public_: boolean) {
    this.post.public = public_;
  }

  @action.bound
  setSlug(slug: string) {
    this.post.slug = slug;
  }

  @action.bound
  setContents(content: EditorState, contentHTML: string) {
    this.post.content = content.toJSON();
    this.post.contentHTML = contentHTML;
  }

  @action
  toggleModal: IO<void> = () => (this.isModalOpened = !this.isModalOpened);
}

export const writeStoreCtx = createContext<WriteStore>(null!);
