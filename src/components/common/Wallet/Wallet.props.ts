import Wallet from "@/types/entities/WalletType";

export default interface WalletProps extends Wallet {
  format?: string
  bg?: string
  onClick?: React.MouseEventHandler<HTMLDivElement> & React.MouseEventHandler<HTMLButtonElement>;
}
