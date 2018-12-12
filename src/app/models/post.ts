import {UserPreview} from './user-preview';

export interface Post {
  readonly _id?: string;
  readonly owner: UserPreview;
  title: string;
  text: string;
  likes: number;
  dislikes: number;
}
