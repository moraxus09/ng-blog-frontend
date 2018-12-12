import {UserPreview} from './user-preview';

export interface PostCommentary {
  readonly _id?: string;
  readonly postId: string;
  readonly owner: UserPreview;
  likes: number;
  dislikes: number;
}
