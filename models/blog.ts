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
  created?: number;
  modified?: number;
  public: boolean;
  title: string;
  slug: string;
  content: PostModelContentsSerialized;
  contentHTML: string;
}
