import { FC } from "react";
import Wallets from "../Wallets";
import Container from "./ChoiceWalletDrawer.style";
import { Button } from "../common";
import ChoiceWalletDrawerProps from "./ChoiceWalletDrawer.props";

const ChoiceWalletDrawer: FC<ChoiceWalletDrawerProps> = ({
  isOpen,
  setDisplay,
  onChange,
  height,
  data,
  placement
}) => {
  const onClose = () => {
    setDisplay(false);
  };
  return (
    <Container
      height={height ?? "auto"}
      title="Chọn ví"
      placement={placement ?? "top"}
      open={isOpen}
      onClose={onClose}
      footer={<Button>Thêm ví</Button>}
    >
      <Wallets wallets={data} onSelected={onChange}></Wallets>
    </Container>
  );
};

export default ChoiceWalletDrawer;
