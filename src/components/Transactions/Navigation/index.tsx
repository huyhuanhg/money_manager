import {
  EditOutlined,
  SwapOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import Container from "./Navigation.style";
import { FC } from "react";
import { useRouter } from "next/router";

const Navigation: FC = () => {
  const router = useRouter();
  return (
    <Container>
      <ul>
        <li className={`icon ${router.pathname === "/transaction" && "active"}`}>
          <TransactionOutlined />
        </li>
        <li className={`icon ${router.pathname === "/transaction/switch" && "active"}`}>
          <SwapOutlined />
        </li>
        <li className={`icon ${router.pathname === "/transaction/modify" && "active"}`}>
          <EditOutlined />
        </li>
      </ul>
    </Container>
  );
};

export default Navigation;
