import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseUrl: string = environment.baseUrl + "account";

  constructor(
    private http: HttpClient
  ) { }

  getAccountsByUser( username: string) {
    return this.http.get(`${this.baseUrl}/byUser/${username}`);
  }
}
