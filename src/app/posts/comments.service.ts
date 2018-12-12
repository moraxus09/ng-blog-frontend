import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEndpoints} from '../config/api-endpoints';
import {Observable} from 'rxjs';
import {PostCommentary} from '../models/post-commentary';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly getCommentsUrl: (postId: string) => string;

  constructor(private http: HttpClient) {
    this.getCommentsUrl = apiEndpoints.getCommentsEndpoint;
  }

  public getComments(postId: string, page = 0, limit = 0): Observable<{comments: PostCommentary[], count: number}> {
    const params = {page: page.toString(), limit: limit.toString()};
    return this.http.get<{comments: PostCommentary[], count: number}>(this.getCommentsUrl(postId), {params});
  }

  public createComment(comment: PostCommentary): Observable<{commentId: string}> {
    return this.http.post<{commentId: string}>(this.getCommentsUrl(comment.postId), comment);
  }

  public editComment(comment: PostCommentary): Observable<void> {
    return this.http.put<void>(`${this.getCommentsUrl(comment.postId)}/${comment._id}`, comment);
  }

  public deleteComment(comment: PostCommentary): Observable<void> {
    return this.http.delete<void>(`${this.getCommentsUrl(comment.postId)}/${comment._id}`);
  }

}
