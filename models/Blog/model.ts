export interface PostContent {
  type: string;
  content?: { text: string }[];
  attrs?: { [key: string]: any };
}

export interface PostModelContentsSerialized {
  doc?: {
    content: PostContent[];
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
