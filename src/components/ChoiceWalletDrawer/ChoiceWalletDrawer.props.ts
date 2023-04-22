import Wallet from "@/types/entities/WalletType";

export default interface ChoiceWalletDrawerProps {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  data: Wallet[];
}
