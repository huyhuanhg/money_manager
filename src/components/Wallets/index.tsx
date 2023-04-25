import { FC } from "react";
import WalletsProps from "./Wallets.props";
import { Container } from "./Wallets.style";
import { Wallet } from "../common";

const Wallets: FC<WalletsProps> = ({ wallets, onSelected }) => {
  return (
    <Container>
      {wallets.map((wallet, index) => (
        <Wallet
          key={wallet.id}
          id={wallet.id}
          icon={wallet.icon}
          money={wallet.money}
          title={wallet.title}
          onClick={() => onSelected(wallet, index)}
        />
      ))}
    </Container>
  );
};

export default Wallets;
