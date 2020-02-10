import { EditorRef } from '@/components/write/Editor';
import { MediaModel } from '@/models/media/model';

import { splitAt } from 'fp-ts/lib/Array';
import { IO } from 'fp-ts/lib/IO';
import { pipe } from 'fp-ts/lib/pipeable';
import { action, computed, observable } from 'mobx';
import { schema } from 'prosemirror-schema-basic';
import { EditorView } from 'prosemirror-view';
import React from 'react';

export class MediaStore {
  @observable mediaRefs: firebase.firestore.DocumentSnapshot[] = [];
  @observable selectedIndex: number | undefined;
  @observable file: File | undefined;
  @observable isLoading: boolean = false;

  private editorRef: React.RefObject<EditorRef> | undefined;

  @computed
  get Media(): readonly MediaModel[] {
    return this.mediaRefs.map(doc => doc.data() as MediaModel);
  }

  @computed
  get SelectedMedia(): MediaModel | undefined {
    if (this.selectedIndex === undefined) {
      return undefined;
    }
    return this.Media[this.selectedIndex];
  }

  private get Editor(): EditorView | undefined {
    if (!this.editorRef || !this.editorRef.current) {
      return;
    }
    return this.editorRef!.current!.getView();
  }

  setEditor(editorRef: React.RefObject<EditorRef>): void {
    this.editorRef = editorRef;
  }

  @action.bound
  setFile(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    this.file = event.target.files[0];
  }

  @action.bound
  insertMedia(): void {
    if (!this.Editor || !this.SelectedMedia) {
      return;
    }

    const tr = this.Editor.state.tr;
    if (!tr.selection.empty) {
      tr.deleteSelection();
    }
    const pos = tr.selection.from;
    this.Editor.dispatch(
      tr.replaceWith(
        pos,
        pos,
        schema.nodes.image.create({ src: this.SelectedMedia.src }),
      ),
    );
  }

  @action.bound
  selectIndex(index: number): void {
    this.selectedIndex = this.selectedIndex === index ? undefined : index;
  }

  @action
  setMediaRefs = (
    refs: firebase.firestore.DocumentSnapshot[],
  ): IO<void> => () => (this.mediaRefs = refs);

  @action
  removeMediaRefAt = (index: number | undefined): IO<void> => () => {
    if (index == undefined) {
      return;
    }

    return (this.mediaRefs = pipe(
      this.mediaRefs,
      splitAt(index),
      ([pre, post]) => pre.concat(post.slice(1)),
    ));
  };

  @action
  setLoading = (loading: boolean): IO<void> => () => (this.isLoading = loading);
}
