import { EditorRef } from '@/components/write/Editor';
import { addMedia, getMediaList } from '@/lib/firebase/firestore/media';
import { addImage } from '@/lib/firebase/storage';
import { MediaModel } from '@/models/media';
import { getDimensions } from '@/utils/image';
import { action, computed, observable } from 'mobx';
import { schema } from 'prosemirror-schema-basic';
import { EditorView } from 'prosemirror-view';
import React from 'react';

const mediaLimit = 25;

export class MediaStore {
  @observable mediaRefs: readonly firebase.firestore.DocumentSnapshot[] = [];
  @observable mediaListPage: number = 0;
  @observable selectedIndex: number | undefined;
  @observable file: File | undefined;
  @observable fetching: boolean = false;

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

  setEditor(editorRef: React.RefObject<EditorRef>) {
    this.editorRef = editorRef;
  }

  @action.bound
  setFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    this.file = event.target.files[0];
  }

  @action.bound
  async uploadMedia() {
    if (this.fetching || !this.file) {
      return;
    }

    this.fetching = true;
    const now = new Date();
    const refAsync = addImage(this.file, this.file.name);

    const { width, height } = await getDimensions(this.file);
    const ref = await refAsync;

    const mediaModel: MediaModel = {
      width,
      height,
      ref: ref.fullPath,
      src: await ref.getDownloadURL(),
      created: now,
      modified: now,
    };
    await addMedia(mediaModel);

    this.mediaListPage = 0;
    await this.fetchMedia(true);

    this.fetching = false;
    alert('추가했습니다.');
  }

  @action
  async fetchMedia(replace?: boolean) {
    if (this.fetching) {
      return;
    }

    this.fetching = true;
    const fetched = await getMediaList(
      mediaLimit,
      this.mediaRefs[this.mediaRefs.length - 1],
    );

    this.mediaRefs = replace ? fetched : this.mediaRefs.concat(fetched);
    this.mediaListPage += 1;
    this.fetching = false;
  }

  @action.bound
  insertMedia() {
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
  selectIndex(index: number) {
    this.selectedIndex = this.selectedIndex === index ? undefined : index;
  }
}
