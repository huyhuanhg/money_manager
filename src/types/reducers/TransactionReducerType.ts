import Transaction from "../entities/TransactionType";
import AbstractReducerType from "./AbstractReducerType";

export default interface TransactionReducerType
  extends AbstractReducerType<Transaction> {
  detail?: Transaction;
}
