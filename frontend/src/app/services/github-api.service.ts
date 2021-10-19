import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  env = environment;

  constructor(
    private http: HttpClient
  ) { }

  searchGitRepo(queryParams: any) {
    return this.http.get(`${this.env.apiBaseUrl}/github/search_repo`, { params: queryParams })
      .pipe(map(response => response as any));
  }

  searchGitUser(queryParams: any) {
    return this.http.get(`${this.env.apiBaseUrl}/github/search_user`, { params: queryParams })
      .pipe(map(response => response as any));
  }
}
