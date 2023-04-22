import { Button } from "@/components/common";
import { FC } from "react";
import CreationDrawerProps from "./Drawer.props";
import Container from "./Drawer.style";
import Navigation from "../Navigation";
import { useRouter } from "next/router";

const CreationDrawer: FC<CreationDrawerProps> = ({ children, title, type }) => {
  const router = useRouter();

  const onClose = () => {
    router.push("/");
  };

  return (
    <Container
      height="100vh"
      title={title}
      placement="bottom"
      open={true}
      footer={<Button>Lưu</Button>}
      onClose={onClose}
    >
      <Navigation type={type} />
      {children}
    </Container>
  );
};

export default CreationDrawer;
