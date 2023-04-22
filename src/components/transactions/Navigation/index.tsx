import {
  EditOutlined,
  SwapOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import Container from "./Navigation.style";
import { FC, useEffect } from "react";
import NavigationProps from "./Navigation.props";
import { useRouter } from "next/router";

const Navigation: FC<NavigationProps> = ({ type }) => {
  const router = useRouter();

  useEffect(() => {
    console.log('router :>> ', router);
  }, [])
  return (
    <Container>
      <ul>
        <li className={`icon ${router.pathname === "/transaction" && "active"}`}>
          <TransactionOutlined />
        </li>
        <li className={`icon ${type === "/transaction/switch" && "active"}`}>
          <SwapOutlined />
        </li>
        <li className={`icon ${type === "/transaction/modify" && "active"}`}>
          <EditOutlined />
        </li>
      </ul>
    </Container>
  );
};

export default Navigation;
