import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiEndpoints} from '../config/api-endpoints';
import {Observable} from 'rxjs';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly postsUrl: string;

  constructor(private http: HttpClient) {
    this.postsUrl = apiEndpoints.posts;
  }

  public getPosts(page = 0, limit = 0): Observable<{posts: Post[], count: number}> {
    const params = {page: page.toString(), limit: limit.toString()};
    return this.http.get<{posts: Post[], count: number}>(this.postsUrl, {params});
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }

  public createPost(post: Post): Observable<{postId: string}> {
    return this.http.post<{postId: string}>(this.postsUrl, post);
  }

  public editPost(post: Post): Observable<void> {
    return this.http.put<void>(`${this.postsUrl}/${post._id}`, post);
  }

  public deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.postsUrl}/${postId}`);
  }

}
