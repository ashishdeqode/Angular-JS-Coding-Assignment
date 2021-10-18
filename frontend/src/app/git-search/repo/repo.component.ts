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
      if(resp.statusCode == 200){
        this.repoData = resp.data.items;
        console.log(this.repoData);
        this.loading = false;
      }
    })
  }

  clearSearch(){
    this.repoData = []
  }

}
