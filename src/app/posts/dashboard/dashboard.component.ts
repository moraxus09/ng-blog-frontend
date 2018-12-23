import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PostsService} from '../posts.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {domain} from '../../config/api-endpoints';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  apiEndpoint: string;
  user: Observable<User>;
  posts: Post[];

  constructor(private auth: AuthService, private postsService: PostsService, private snackBar: MatSnackBar) {
    this.apiEndpoint = domain;
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.postsService.getPosts().subscribe((res: {posts: Post[], count: number}) => {
      this.posts = res.posts;
    });
  }

  onPostDelete(id: string) {
    this.postsService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post._id !== id);
    });
  }

  onPostRateChange(post: Post) {
    this.postsService.updatePost(post).subscribe();
  }

}
