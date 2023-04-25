import { Button } from "../common";
import { FC } from "react";
import CreateCategoryDrawerProps from "./CreateCategoryDrawer.props";
import Container from "./CreateCategoryDrawer.style";

const CreateCategoryDrawer: FC<CreateCategoryDrawerProps> = ({
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
      title="Danh mục mới"
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

export default CreateCategoryDrawer;
