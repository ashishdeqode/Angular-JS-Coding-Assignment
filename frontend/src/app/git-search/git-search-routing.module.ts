import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoComponent } from './repo/repo.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'repo',
    component: RepoComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GitSearchRoutingModule { }
