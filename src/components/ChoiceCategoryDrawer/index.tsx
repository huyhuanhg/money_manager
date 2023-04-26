import { FC, useEffect, useState } from "react";
import Container from "./ChoiceCategoryDrawer.style";
import ChoiceCategoryDrawerProps from "./ChoiceCategoryDrawerProps.props";
import { Button } from "../common";
import Categories from "../Categories";
import CreateCategoryDrawer from "../CreateCategoryDrawer";

const ChoiceCategoryDrawer: FC<ChoiceCategoryDrawerProps> = ({
  height,
  placement,
  isOpen,
  setDisplay,
  data,
  onChange,
  footer
}) => {
  const [isOpenCreateDrawer, setIsOpenCreateDrawer] = useState(false);

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
      footer={
        footer ??
        <Button onClick={() => setIsOpenCreateDrawer(true)}>
          Thêm danh mục
        </Button>
      }
    >
      <Categories categories={data} onSelected={onChange} />
      <CreateCategoryDrawer
        placement={placement}
        isOpen={isOpenCreateDrawer}
        height="100vh"
        setDisplay={setIsOpenCreateDrawer}
      />
    </Container>
  );
};

export default ChoiceCategoryDrawer;
