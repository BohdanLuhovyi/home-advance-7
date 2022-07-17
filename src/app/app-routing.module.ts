import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {path: 'blogs', component: BlogComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'blogs', component: AdminBlogComponent},
    {path: '', pathMatch: 'full', redirectTo: 'blogs'}
  ]},
  {path: '', pathMatch: 'full', redirectTo: 'blogs'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
