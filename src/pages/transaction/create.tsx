import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import Layout from "@/layouts/TransactionCreateLayout";
import { Container, Field, FormControl, Nav } from "./create-style";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  SwapOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Form, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchAllOwnedWallet } from "@/stores/wallet/action";
import WalletReducerType from "@/types/reducers/WalletReducerType";

const TransactionCreate = ({ user }: AuthComponentProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const [mode, setMode] = useState({
    type: "trans",
    title: "Thêm giao dịch",
  });

  const walletOptions = useSelector(({ walletReducer: wallets }: Record<string, WalletReducerType>) => {
    const { data } = { ...wallets }

    if (data.length <= 1) {
      return []
    }

    return data.filter(({id}) => id !== 'default').map(({ id, title, money }) => ({
      value: id,
      label: `${title} (${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ)`,
    }))
  })

  useEffect(() => {
    dispatch(fetchAllOwnedWallet({ email: user.email }))
  }, []);

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
              rules={[{ required: true, message: "Bắt buộc" }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${(value as string).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ`
                }
              />
            </FormControl>
          </Field>
          <Field>
            <div className="icon">ICON</div>
            <FormControl
              name="wallet"
              rules={[{ required: true, message: "Bắt buộc" }]}
            >
              <Select
                labelInValue
                placeholder="Chọn ví"
                options={walletOptions}
              />
            </FormControl>
          </Field>
        </Form>
      </Container>
    </Layout>
  );
};

export default TransactionCreate;
