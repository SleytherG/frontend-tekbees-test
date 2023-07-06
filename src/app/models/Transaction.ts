export interface Transaction {
  idTransaccion: number,
  fechaOperacion: string,
  descripcion: string,
  idCuenta: number,
  monto: number
}

export interface TransferMoney {
  idCuentaOrigen: number,
  idCuentaDestino: number,
  monto: number
}
