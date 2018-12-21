import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../posts.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss']
})
export class CreateUpdatePostComponent implements OnInit {

  postForm: FormGroup;
  fileReader = new FileReader();
  previewSrc: any;
  editMode = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private fb: FormBuilder) {
    this.editMode = !!activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if (!this.editMode) {
      this.postForm = this.fb.group({
        title: [null, [Validators.required, Validators.minLength(3)]],
        text: [null, [Validators.required, Validators.minLength(10)]],
        preview: [null, Validators.required]
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
    if (!this.postForm.valid) {
      return;
    }

    if (this.editMode) {

    } else {
      const post = this.postForm.value;
      this.postsService.createPost(post.title, post.text, post.preview)
        .subscribe(() => this.router.navigate(['dashboard']));
    }
  }
}
