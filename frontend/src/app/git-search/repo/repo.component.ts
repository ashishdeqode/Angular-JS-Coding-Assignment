import { Component } from '@angular/core';
import { GithubApiService } from 'src/app/services/github-api.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent {

  // to handle error messages
  loading: boolean = false;
  noDataError: boolean = false;
  serverError: boolean = false;

  // to store search string
  searchText: string = '';

  // for pagination
  currentPage: number = 1;
  perPageLimit: number = 10;
  totalRecords: number = 0;

  // to store api response data
  repoData: Array<any> = [];

  constructor(
    private gitService: GithubApiService
  ) { }

  // to search repo
  searchRepo() {
    if (this.searchText.trim().length == 0) {
      return;
    }

    this.repoData = [];
    this.loading = true;
    this.noDataError = false;
    this.serverError = false;

    const params = {
      repo: this.searchText,
      page: this.currentPage,
      limit: this.perPageLimit
    };

    this.gitService.searchGitRepo(params).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.totalRecords = resp.data.total_count;
        this.repoData = resp.data.items;
        this.loading = false;
        if (this.repoData.length == 0) {
          this.noDataError = true;
        }
      } else {
        this.loading = false;
        this.serverError = true;
      }
    })
  }

  // to clear search
  clearSearch() {
    this.loading = false;
    this.noDataError = false;
    this.serverError = false;
    this.repoData = [];
    this.currentPage = 1;
    this.totalRecords = 0;
  }

}
