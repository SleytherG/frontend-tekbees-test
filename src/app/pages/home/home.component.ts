import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../services/accounts.service";
import {TransactionsService} from "../../services/transactions.service";
import {Account} from "../../models/Account";
import {Transaction} from "../../models/Transaction";
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';
import {MatDialog} from "@angular/material/dialog";
import {ModalFormTransferComponent} from "../../components/modal-form-transfer/modal-form-transfer.component";

// registerLocaleData(localeEs);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    MatDialog
  ]
})
export class HomeComponent implements OnInit {

  accounts: Account[] = [];
  transactions: Transaction[] = [];

  constructor(
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getAccountsByUserLogged();
  }


  getAccountsByUserLogged() {
    const usernameLogged = localStorage.getItem('username') || '';
    this.accountsService.getAccountsByUser(usernameLogged).subscribe({
      next: ( accounts: any ) => {
        if ( accounts.length ) {
          this.accounts = accounts;
        }
      },
      error: err => {}
    })
  }

  getTransactionsByAccount( idCuenta: number) {
    this.transactions = [];
    this.transactionsService.getTransactionsByAccount(idCuenta).subscribe({
      next: ( transactionsByAccount: any ) => {
        if ( transactionsByAccount.length ) {
          this.transactions = transactionsByAccount;
        }
      },
      error: err => {}
    })
  }

  openModalTransaction() {
    const dialogRef = this.matDialog.open(ModalFormTransferComponent);


    dialogRef.afterClosed().subscribe((result) => {
        this.getAccountsByUserLogged();
    })
  }
}
