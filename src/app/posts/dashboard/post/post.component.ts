import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../../../models/post';
import {domain} from '../../../config/api-endpoints';
import {User} from '../../../models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: Post;
  @Input() set user(user: User) {
    if (user) {
      this.userId = user._id;
      this.liked = this.post.likes.includes(user._id);
      this.unrated = !this.liked && !this.post.dislikes.includes(user._id);
    }
  }
  @Output() delete = new EventEmitter<void>();
  @Output() rateChange = new EventEmitter<void>();

  userId: string;
  unrated: boolean;
  liked: boolean;
  apiEndpoint: string;

  constructor() {
    this.apiEndpoint = domain;
  }

  onLike() {
    if (this.unrated) {
      this.post.likes.push(this.userId);
      this.liked = true;
      this.unrated = false;
    } else if (this.liked) {
      this.post.likes = this.post.likes.filter(userId => userId !== this.userId);
      this.liked = false;
      this.unrated = true;
    } else {
      this.post.dislikes = this.post.dislikes.filter(userId => userId !== this.userId);
      this.post.likes.push(this.userId);
      this.liked = true;
      this.unrated = false;
    }
    this.rateChange.emit();
  }

  onDislike() {
    if (this.unrated) {
      this.post.dislikes.push(this.userId);
      this.liked = false;
      this.unrated = false;
    } else if (!this.liked) {
      this.post.dislikes = this.post.dislikes.filter(userId => userId !== this.userId);
      this.unrated = true;
    } else {
      this.post.likes = this.post.likes.filter(userId => userId !== this.userId);
      this.post.dislikes.push(this.userId);
      this.liked = false;
      this.unrated = false;
    }
    this.rateChange.emit();
  }
}
