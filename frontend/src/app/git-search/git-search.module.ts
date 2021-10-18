import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GitSearchRoutingModule } from './git-search-routing.module';
import { RepoComponent } from './repo/repo.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    RepoComponent,
    UserComponent,
    ShortNumberPipe
  ],
  imports: [
    CommonModule,
    GitSearchRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class GitSearchModule { }
