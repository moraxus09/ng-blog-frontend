import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PostsService} from '../posts.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {map} from 'rxjs/internal/operators';
import {domain} from '../../config/api-endpoints';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  apiEndpoint: string;
  user: Observable<User>;
  posts: Observable<Post[]>;

  constructor(private auth: AuthService, private postsService: PostsService) {
    this.apiEndpoint = domain;
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.posts = this.postsService.getPosts()
      .pipe(map((res: {posts: Post[], count: number}) => res.posts));
  }

}
