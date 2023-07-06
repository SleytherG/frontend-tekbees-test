import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AccountsService} from "../../services/accounts.service";
import {Account} from "../../models/Account";
import {TransferMoney} from "../../models/Transaction";
import {TransactionsService} from "../../services/transactions.service";
import Swal, {SweetAlertIcon} from "sweetalert2";

@Component({
  selector: 'app-modal-form-transfer',
  templateUrl: './modal-form-transfer.component.html',
  styleUrls: ['./modal-form-transfer.component.scss']
})
export class ModalFormTransferComponent implements OnInit {

  accounts: Account[] = [];

  accountOrigen = '';
  accountDestino = '';
  amountToTransfer = 0;

  @Output() onEmitValue = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ModalFormTransferComponent>,
    private accountsService: AccountsService,
    private transactionService: TransactionsService
  ) {
  }

  ngOnInit() {
    this.getAccountsByUserLogged();
  }


  closeDialog() {
    this.dialogRef.close()
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

  get accountsFiltered() {
    return this.accounts.filter(account => account.nroCuenta != this.accountOrigen);
  }

  doTransaction() {
    const cuentaOrigen = this.accounts.find( account => account.nroCuenta == this.accountOrigen);
    const cuentaDestino = this.accounts.find( account => account.nroCuenta == this.accountDestino);

    const body : TransferMoney = {
      idCuentaOrigen: cuentaOrigen!.idCuenta,
      idCuentaDestino: cuentaDestino!.idCuenta,
      monto: this.amountToTransfer
    };

    this.transactionService.transferToAccount(body).subscribe({
      next: ( responseService: any) => {
        const { response } = responseService;
        if ( response.estado == 1) {
          this._showAlertDialog(response.mensaje, 'success')
            .then(result => {
              if ( result.isConfirmed) {
                this.closeDialog();
              }
            })
        }
      },
      error: err => {}
    })
  }

  private _showAlertDialog(title: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      icon: icon
    })
  }

}
