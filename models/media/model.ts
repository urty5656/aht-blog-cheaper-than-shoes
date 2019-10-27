import { BaseModel } from '../BaseModel';

export interface MediaModel extends BaseModel {
  src: string;
  ref: string;
  width?: number;
  height?: number;
}
