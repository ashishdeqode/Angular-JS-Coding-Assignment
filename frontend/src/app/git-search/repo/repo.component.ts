import { Component, OnInit } from '@angular/core';
import { GitService } from 'src/app/services/git.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  loading: any = false;

  searchText: any;
  currentPage: any = 1;
  perPageLimit: any = 10;
  totalRecords: any = 0;
  p: any = 1;

  repoData: any = [];

  constructor(
    private gitService: GitService
  ) { }

  ngOnInit(): void {
  }

  searchRepo(){
    this.repoData = [];
    this.loading = true;
    const params = {
      search: this.searchText,
      page: this.currentPage,
      limit: this.perPageLimit
    };
    this.gitService.searchGitRepo(params).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.statusCode == 200){
        this.totalRecords = resp.data.total_count;
        this.repoData = resp.data.items;
        console.log(this.repoData);
        this.loading = false;
      }
    })
  }

  clearSearch(event: any){
    this.loading = false;
    this.repoData = [];
    this.currentPage = 1;
    this.totalRecords = 0;
    console.log('clear: ', event);

  }

  loadPageData(event: any){
    console.log('page search: ', event);

  }

}
