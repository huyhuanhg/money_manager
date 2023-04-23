export interface TransactionBase {
  money: number;
  wallet: string;
  category: string;
  datetime: string;
  note: string;
  notReportFlg: boolean
}

export default interface Transaction extends TransactionBase {
  id: string;
}
