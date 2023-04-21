import { FC } from "react";
import DrawerProps from "./Drawer.props";
import { Container } from "./Drawer.style";

const Drawer: FC<DrawerProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
};

export default Drawer;
