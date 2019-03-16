import autobind from 'autobind-decorator';
import { action, observable } from 'mobx';
import { EditorState } from 'prosemirror-state';
import { path, prop } from 'ramda';
import { createContext } from 'react';
import { addBlogPost } from '../lib/firebase/firestore';
import { PostModel } from '../models/blog';

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

  @autobind
  @action
  setPost(post: PostModel) {
    this.post = post;
  }

  @autobind
  @action
  setPublic(public_: boolean) {
    this.post.public = public_;
  }

  @autobind
  @action
  setSlug(slug: string) {
    this.post.slug = slug;
  }

  @autobind
  @action
  setContents(content: EditorState, contentHTML: string) {
    this.post.content = content.toJSON();
    this.post.contentHTML = contentHTML;
  }

  @autobind
  @action
  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
  }

  @autobind
  @action
  submit() {
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
    const now = new Date();
    if (!this.post.created) {
      this.post.created = now;
    }
    this.post.modified = now;

    // execute
    addBlogPost(this.post).fork(
      () => window.alert('Error!'),
      () => {
        window.alert('Added!');
        this.toggleModal();
      },
    );
  }
}

export const writeStoreCtx = createContext(new WriteStore());
