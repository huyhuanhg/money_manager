import { FC } from "react";
import DrawerProps from "./Drawer.props";
import { Container } from "./Drawer.style";

const Drawer: FC<DrawerProps> = ({
  children,
  btnClosePos,
  placement,
  height,
  ...props
}) => {
  return (
    <Container
      {...props}
      btnClosePos={btnClosePos ?? "right"}
      height={height ?? "auto"}
      placement={placement ?? "bottom"}
    >
      {children}
    </Container>
  );
};

export default Drawer;
