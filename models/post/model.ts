import { BaseModel } from '../BaseModel';

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

export interface PostModel extends BaseModel {
  public: boolean;
  title: string;
  slug: string;
  content: PostModelContentsSerialized;
  contentHTML: string;
}
