import Wallet from "@/types/entities/WalletType";

export default interface ChoiceWalletDrawerProps {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  data: Wallet[];
  height?: number | string,
  placement?: 'top' | 'bottom'
}
