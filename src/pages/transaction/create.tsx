import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import Layout from "@/layouts/TransactionCreateLayout";
import { Nav } from "./create-style";
import { useState } from "react";
import {
  EditOutlined,
  SwapOutlined,
  TransactionOutlined,
} from "@ant-design/icons";

const TransactionCreate = ({ user }: AuthComponentProps) => {
  const [mode, setMode] = useState();

  return (
    <Layout>
      <Nav>
        <ul>
          <li className="mode-icon active"><TransactionOutlined /></li>
          <li className="mode-icon"><SwapOutlined /></li>
          <li className="mode-icon"><EditOutlined /></li>
        </ul>
      </Nav>
    </Layout>
  );
};

export default TransactionCreate;
