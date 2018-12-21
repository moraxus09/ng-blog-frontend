import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateUpdatePostComponent} from './create-update-post/create-update-post.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'posts/:id/edit', component: CreateUpdatePostComponent, canActivate: [AuthGuard] },
  { path: 'posts/new', component: CreateUpdatePostComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
