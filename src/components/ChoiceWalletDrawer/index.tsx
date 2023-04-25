import { FC, useState } from "react";
import Wallets from "../Wallets";
import Container from "./ChoiceWalletDrawer.style";
import { Button } from "../common";
import ChoiceWalletDrawerProps from "./ChoiceWalletDrawer.props";
import CreateWalletDrawer from "../CreateWalletDrawer";

const ChoiceWalletDrawer: FC<ChoiceWalletDrawerProps> = ({
  isOpen,
  setDisplay,
  onChange,
  height,
  data,
  placement,
}) => {
  const [isOpenCreateDrawer, setIsOpenCreateDrawer] = useState(false);

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
      footer={
        <Button onClick={() => setIsOpenCreateDrawer(true)}>Thêm ví</Button>
      }
    >
      <Wallets wallets={data} onSelected={onChange}></Wallets>
      <CreateWalletDrawer
        placement={placement}
        isOpen={isOpenCreateDrawer}
        height="100vh"
        setDisplay={setIsOpenCreateDrawer}
      />
    </Container>
  );
};

export default ChoiceWalletDrawer;
