import Container from "./CreateWalletDrawer.style";
import CreateWalletDrawerProps from "./CreateWalletDrawer.props";
import { Button } from "../common";
import { FC } from "react";

const CreateWalletDrawer: FC<CreateWalletDrawerProps> = ({
  isOpen,
  setDisplay,
  height,
  placement,
}) => {
  const onClose = () => {
    setDisplay(false);
  };
  return (
    <Container
      height={height ?? "auto"}
      title="Ví mới"
      placement={placement ?? "top"}
      open={isOpen}
      onClose={onClose}
      footer={
        <Button>Lưu</Button>
      }
    >
    </Container>
  );
};

export default CreateWalletDrawer;
