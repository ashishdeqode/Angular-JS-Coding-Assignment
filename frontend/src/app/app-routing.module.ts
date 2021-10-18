import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GitSearchModule } from './git-search/git-search.module';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'search',
    loadChildren: () => import('./git-search/git-search.module').then(m => m.GitSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
