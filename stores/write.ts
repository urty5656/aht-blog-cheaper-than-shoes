import { action, observable } from 'mobx';
import { EditorState } from 'prosemirror-state';
import { path, prop } from 'ramda';
import { createContext } from 'react';

import { addBlogPost, updateBlogPost } from '@/lib/firebase/firestore/blog';
import { PostModel } from '@/models/blog';
import { MediaStore } from './partial/media';

export class WriteStore {
  @observable
  post: PostModel = {
    public: false,
    title: '',
    slug: '',
    content: {},
    contentHTML: '',
  };

  @observable
  isModalOpened: boolean = false;

  // Create (false) or Update (true)
  private isUpdating: boolean = false;
  private readonly media = new MediaStore();

  get MediaStore() {
    return this.media;
  }

  /**
   * Set a post for editing. This action implies `isUpdating = true`.
   */
  @action.bound
  setPost(post: PostModel) {
    this.post = post;
    this.isUpdating = true;
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

  @action.bound
  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
  }

  @action.bound
  async submit() {
    // validations
    if (!this.post.slug) {
      return window.alert('No slug!');
    }
    if (!this.post.content.doc) {
      return window.alert('No contents!');
    }

    // title from the first h1
    const firstHeading = this.post.content.doc.content.find(
      node => node.type === 'heading' && path(['attrs', 'level'], node) === 1,
    );
    if (firstHeading) {
      const title = prop('content', firstHeading);
      if (title) {
        this.post.title = title.reduce((acc, mark) => acc + mark.text, '');
      }
    }

    // times
    const now = Number(new Date());
    if (!this.post.created) {
      this.post.created = now;
    }
    this.post.modified = now;

    // execute
    // [TODO] what should happen when I change slug? duh
    try {
      await (this.isUpdating
        ? updateBlogPost(this.post)
        : addBlogPost(this.post));
      window.alert('Added!');
      this.toggleModal();
    } catch (_) {
      window.alert('Error!');
    }
  }
}

export const writeStoreCtx = createContext(new WriteStore());
