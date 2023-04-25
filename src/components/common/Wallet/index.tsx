import { FC } from "react";
import Container, * as Style from "./Wallet.style";
import WalletProps from "./Wallet.props";

const Wallet: FC<WalletProps> = ({
  icon,
  title,
  money,
  format,
  bg,
  onClick,
}) => {
  return (
    <Container onClick={onClick} bg={bg}>
      <Style.WalletPrefix>{icon}</Style.WalletPrefix>
      <Style.WalletBody>{title}</Style.WalletBody>
      <Style.WalletSuffix>{`${new Intl.NumberFormat().format(money)} ${
        format ?? "đ"
      }`}</Style.WalletSuffix>
    </Container>
  );
};

export default Wallet;
