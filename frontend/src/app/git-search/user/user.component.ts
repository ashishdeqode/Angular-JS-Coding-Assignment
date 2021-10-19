import { Component } from '@angular/core';
import { GithubApiService } from 'src/app/services/github-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
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
  userData: any = [];

  constructor(
    private gitService: GithubApiService
  ) { }

  // to search user
  searchUser() {
    if (this.searchText.trim().length == 0) {
      return;
    }

    this.userData = [];
    this.loading = true;
    this.noDataError = false;
    this.serverError = false;

    const params = {
      user: this.searchText,
      page: this.currentPage,
      limit: this.perPageLimit
    };

    this.gitService.searchGitUser(params).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.totalRecords = resp.total_counts;
        this.userData = resp.data;
        this.loading = false;

        if (this.userData.length == 0) {
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
    this.userData = [];
    this.currentPage = 1;
    this.totalRecords = 0;
  }

}

