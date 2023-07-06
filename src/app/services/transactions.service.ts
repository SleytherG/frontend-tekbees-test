import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TransferMoney} from "../models/Transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  baseUrl = environment.baseUrl + "transaction";

  constructor(
    private http: HttpClient
  ) { }

  getTransactionsByAccount(idCuenta: number) {
    return this.http.get(`${this.baseUrl}/byUser/${idCuenta}`);
  }

  transferToAccount(body: TransferMoney) {
    return this.http.post(`${this.baseUrl}/transferMoney`, body);
  }
}
