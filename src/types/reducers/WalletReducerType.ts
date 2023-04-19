import Wallet from "../entities/WalletType";
import AbstractReducerType from "./AbstractReducerType";

export default interface WalletReducerType  extends AbstractReducerType<Wallet> {
  active: number
}
