import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import Layout from "@/layouts/TransactionCreateLayout";
import { Container, Field, FormControl, Nav } from "./create-style";
import { useState } from "react";
import {
  EditOutlined,
  SwapOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Form, InputNumber } from "antd";

const TransactionCreate = ({ user }: AuthComponentProps) => {
  const [mode, setMode] = useState({
    type: "trans",
    title: "Thêm giao dịch",
  });

  const changeMode = (updateMode: string) => {
    if (mode.type === updateMode) {
      return;
    }

    const modeTitleMap: Record<string, string> = {
      trans: "Thêm giao dịch",
      switch: "Chuyển khoản",
      modify: "Điều chỉnh",
    };

    setMode({
      type: updateMode,
      title: modeTitleMap[updateMode],
    });
  };

  return (
    <Layout title={mode.title}>
      <Nav>
        <ul>
          <li
            className={`mode-icon ${mode.type === "trans" && "active"}`}
            onClick={() => changeMode("trans")}
          >
            <TransactionOutlined />
          </li>
          <li
            className={`mode-icon ${mode.type === "switch" && "active"}`}
            onClick={() => changeMode("switch")}
          >
            <SwapOutlined />
          </li>
          <li
            className={`mode-icon ${mode.type === "modify" && "active"}`}
            onClick={() => changeMode("modify")}
          >
            <EditOutlined />
          </li>
        </ul>
      </Nav>
      <Container>
        <Form>
          <Field>
            <div className="icon">ICON</div>
            <FormControl
              label="Số tiền"
              name="money"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </FormControl>
          </Field>
        </Form>
      </Container>
    </Layout>
  );
};

export default TransactionCreate;
