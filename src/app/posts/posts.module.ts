import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PostsRoutingModule} from './posts-routing.module';
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { PostComponent } from './dashboard/post/post.component';

@NgModule({
  declarations: [DashboardComponent, CreateUpdatePostComponent, PostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
