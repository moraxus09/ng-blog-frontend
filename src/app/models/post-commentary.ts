import {UserPreview} from './user-preview';

export interface PostCommentary {
  readonly _id?: string;
  readonly postId: string;
  readonly owner: UserPreview;
  likes: string[];
  dislikes: string[];
  timestamp: number;
}
