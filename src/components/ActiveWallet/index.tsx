import { FC } from "react";
import { Wallet } from "../common";
import ActiveWalletProps from "./ActiveWallet.props";
import Container from "./ActiveWallet.style";

const ActiveWallet: FC<ActiveWalletProps> = ({ onClick, wallet }) => {
  return (
    <Container onClick={onClick} >
      <Wallet {...wallet} bg="#505050"/>
    </Container>
  );
};

export default ActiveWallet;
