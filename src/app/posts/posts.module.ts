import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PostsRoutingModule} from './posts-routing.module';
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, CreateUpdatePostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
