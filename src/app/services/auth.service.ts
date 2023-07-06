import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Login, Register } from "../models/Auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) { }

  baseUrl = environment.baseUrl + "auth";

  login(login: Login) {
    return this.http.post(`${this.baseUrl}/login`, login);
  }

  register(register: Register) {
    return this.http.post(`${this.baseUrl}/register`, register);
  }
}
