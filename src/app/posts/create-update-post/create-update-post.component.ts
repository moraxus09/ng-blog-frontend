import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../posts.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../models/post';
import {domain} from '../../config/api-endpoints';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss']
})
export class CreateUpdatePostComponent implements OnInit {

  postForm: FormGroup;
  fileReader = new FileReader();
  previewSrc: any;
  editingPostId: string;
  editingPost: Post;
  apiEndpoint: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private fb: FormBuilder) {
    this.apiEndpoint = domain;
    this.editingPostId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      text: [null, [Validators.required, Validators.minLength(10)]],
      preview: [null, Validators.required]
    });

    if (this.editingPostId) {
      this.postsService.getPost(this.editingPostId)
        .subscribe(post => {
          this.editingPost = post;
          this.postForm.patchValue({title: post.title, text: post.text});
          this.previewSrc = this.apiEndpoint + post.previewSrc;
        });
    }
  }

  onPreviewChange(e: Event) {
    const image = (e.target as HTMLInputElement).files[0];
    this.postForm.get('preview').setValue(image);
    this.fileReader.onload = () => {
      this.previewSrc = this.fileReader.result;
    };
    this.fileReader.readAsDataURL(image);
  }

  onSubmit() {
    // if (!this.postForm.valid) {
    //   return;
    // }

    if (this.editingPostId) {
      this.editingPost.title = this.postForm.value.title;
      this.editingPost.text = this.postForm.value.text;
      this.postsService.updatePost(this.editingPost)
        .subscribe(() => this.router.navigate(['dashboard']));
    } else {
      const post = this.postForm.value;
      this.postsService.createPost(post.title, post.text, post.preview)
        .subscribe(() => this.router.navigate(['dashboard']));
    }
  }

  onDelete() {
    this.postsService.deletePost(this.editingPostId)
      .subscribe(() => this.router.navigate(['dashboard']));
  }
}
