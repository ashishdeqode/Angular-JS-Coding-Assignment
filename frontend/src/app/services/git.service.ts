import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GitService {
  env = environment;

  constructor(
    private http: HttpClient
  ) { }

  searchGitRepo(params: any){
    return this.http.get(this.env.apiBaseUrl + `/github/search_repo?repo=${params.search}&page=${params.page}&limit=${params.limit}`).pipe(map(o => o as any));
  }

  searchGitUser(params: any){
    return this.http.get(this.env.apiBaseUrl + `/github/search_user?user=${params.search}&page=${params.page}&limit=${params.limit}`).pipe(map(o => o as any));
  }
}
