import Wallet from "@/types/entities/WalletType";

export default interface WalletsProps {
  wallets: Wallet[]
  onSelected: Function
}

