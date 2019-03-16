interface PostModelContentsSerialized {
  doc?: {
    content: {
      type: string;
      content?: { text: string }[];
      attrs?: { [key: string]: any };
    }[];
  };
  selection?: object;
}

export interface PostModel {
  created?: Date;
  modified?: Date;
  public: boolean;
  title: string;
  slug: string;
  content: PostModelContentsSerialized;
  contentHTML: string;
}
