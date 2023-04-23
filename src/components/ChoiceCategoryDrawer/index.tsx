import { FC, useEffect } from "react";
import Container from "./ChoiceCategoryDrawer.style";
import ChoiceCategoryDrawerProps from "./ChoiceCategoryDrawerProps.props";
import { Button } from "../common";
import Categories from "../Categories";

const ChoiceCategoryDrawer: FC<ChoiceCategoryDrawerProps> = ({
  height,
  placement,
  isOpen,
  setDisplay,
  data,
  onChange
}) => {

  const onClose = () => {
    setDisplay(false);
  };
  return (
    <Container
      height={height ?? "auto"}
      title="Chọn danh mục"
      placement={placement ?? "top"}
      open={isOpen}
      onClose={onClose}
      footer={<Button>Thêm danh mục</Button>}
    >
      <Categories categories={data} onSelected={onChange} />
    </Container>
  );
};

export default ChoiceCategoryDrawer;
