import Wallet from "@/types/entities/WalletType";

export default interface ActiveWalletProps {
  wallet: Wallet
  onClick: React.MouseEventHandler<HTMLDivElement> & React.MouseEventHandler<HTMLButtonElement>;
}
