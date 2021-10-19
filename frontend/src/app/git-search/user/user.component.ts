import { Component, OnInit } from '@angular/core';
import { GitService } from 'src/app/services/git.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loading: any = false;

  searchText: any;
  currentPage: any = 1;
  perPageLimit: any = 10;
  totalRecords: any = 0;
  p: any = 1;

  userData: any = [];

  constructor(
    private gitService: GitService
  ) { }

  ngOnInit(): void {
  }

  searchUser(){
    this.userData = [];
    this.loading = true;
    const params = {
      search: this.searchText,
      page: this.currentPage,
      limit: this.perPageLimit
    };
    this.gitService.searchGitUser(params).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.statusCode == 200){
        this.totalRecords = resp.total_counts;
        this.userData = resp.data;
        console.log(this.userData);
        this.loading = false;
      }
    })
  }

  clearSearch(event: any){
    this.loading = false;
    this.userData = [];
    this.currentPage = 1;
    this.totalRecords = 0;
    // console.log('clear: ', event);

  }

}

