import Container from "./CreateWalletDrawer.style";
import CreateWalletDrawerProps from "./CreateWalletDrawer.props";
import { Button, Field } from "../common";
import * as FieldStyle from "@/components/common/Field/Field.style";
import { FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useUserContext } from "@/layouts/AuthLayout";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchStoreWallet } from "@/stores/wallet/action";

const CreateWalletDrawer: FC<CreateWalletDrawerProps> = ({
  isOpen,
  setDisplay,
  height,
  placement,
}) => {
  const { user } = useUserContext();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [formState, setFormState] = useState<Record<string, any>>({
    money: {
      value: undefined,
    },
    wallet: {
      value: undefined,
      error: "",
    },
  });

  useEffect(() => {
    console.log("user :>> ", user);
  }, [user]);
  const onClose = () => {
    setDisplay(false);
  };

  const handleChangeFormState = (
    key: string,
    value: Record<string, unknown>
  ) => {
    setFormState({
      ...formState,
      [key]: {
        ...formState[key],
        ...value,
      },
    });
  };

  const parseData = () => {
    const cloneData = { ...formState };
    let hasError = false;

    const validateRequired = (data: Record<string, any>, error: boolean) => {
      if (!data.value) {
        data.error = "Bắt buộc";

        return true;
      }

      return error;
    };

    for (const key in cloneData) {
      switch (key) {
        case "wallet":
          hasError = validateRequired(cloneData[key], hasError);
          break;
      }
    }

    if (hasError) {
      setFormState(cloneData);
      return false;
    }

    return {
      money: cloneData.money.value as number,
      title: cloneData.wallet.value as string,
      icon: (cloneData.wallet.value as string).charAt(0).toUpperCase(),
      user: user?.email,
    };
  };

  const onSubmit = () => {
    const data = parseData();

    if (!data) {
      return;
    }

    dispatch(fetchStoreWallet({ data })).then(() => setDisplay(false));
  };
  return (
    <Container
      height={height ?? "auto"}
      title="Ví mới"
      placement={placement ?? "top"}
      open={isOpen}
      onClose={onClose}
      footer={<Button onClick={onSubmit}>Lưu</Button>}
    >
      <Field prefix={"ICON"} required errorMsg={formState.wallet.error}>
        <FieldStyle.Input>
          <Input
            placeholder="Tên ví"
            value={formState.wallet.value}
            onChange={(e) =>
              handleChangeFormState("wallet", { value: e.target.value })
            }
            onFocus={() => {
              handleChangeFormState("wallet", { error: "" });
            }}
          />
        </FieldStyle.Input>
      </Field>
      <Field prefix={"ICON"}>
        <FieldStyle.FieldNumber
          addonAfter="đ"
          placeholder="Số dư ban đầu"
          formatter={(value) =>
            `${(value as string).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          }
          value={formState.money.value}
          onChange={(value) => handleChangeFormState("money", { value })}
        />
      </Field>
    </Container>
  );
};

export default CreateWalletDrawer;
