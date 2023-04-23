import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import Layout from "@/layouts/TransactionLayout";
import { useEffect, useState } from "react";
import { Input, Space, Switch, TimePicker } from "antd";
import * as FieldStyle from "@/components/common/Field/Field.style";
import { DatePicker, Field } from "@/components/common";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import ChoiceWalletDrawer from "@/components/ChoiceWalletDrawer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import WalletReducerType from "@/types/reducers/WalletReducerType";
import {
  fetchAllOwnedWallets,
  fetchChangeBalance,
} from "@/stores/wallet/action";
import Wallet from "@/types/entities/WalletType";
import ChoiceCategoryDrawer from "@/components/ChoiceCategoryDrawer";
import { fetchAllOwnedCategories } from "@/stores/category/action";
import Category from "@/types/entities/CategoryType";
import { fetchStoreTransaction } from "@/stores/transaction/action";
import { useRouter } from "next/router";

const TransactionCreate = ({ user }: AuthComponentProps) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: wallets } = useSelector(
    ({ walletReducer: wallets }: Record<string, WalletReducerType>) => wallets
  );
  const { data: categories } = useSelector(
    ({ categoryReducer: categories }: Record<string, WalletReducerType>) =>
      categories
  );

  const now = dayjs();

  const [formState, setFormState] = useState<Record<string, any>>({
    money: {
      value: undefined,
      error: "",
    },
    category: {
      value: undefined,
      label: undefined,
      error: "",
    },
    wallet: {
      value: undefined,
      label: undefined,
      error: "",
    },
    date: {
      value: now.format("DD/MM/YYYY"),
    },
    time: {
      value: now.format("HH:mm"),
    },
    note: {
      value: undefined,
    },
    notReportFlg: {
      value: false,
    },
  });

  const [isOpenWalletDrawer, setIsOpenWalletDrawer] = useState<boolean>(false);
  const [isOpenCategoryDrawer, setIsOpenCategoryDrawer] =
    useState<boolean>(false);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  useEffect(() => {
    dispatch(fetchAllOwnedCategories({ email: user.email }));
    dispatch(fetchAllOwnedWallets({ email: user.email }));
  }, []);

  const onOpenWalletDrawer = () => {
    setIsOpenWalletDrawer(true);
  };

  const onOpenCategoryDrawer = () => {
    setIsOpenCategoryDrawer(true);
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

  const onChangeWallet = (wallet: Wallet) => {
    handleChangeFormState("wallet", {
      value: wallet.id,
      label: wallet.title,
      error: "",
    });

    setIsOpenWalletDrawer(false);
  };

  const onChangeCategory = (category: Category) => {
    handleChangeFormState("category", {
      value: category.id,
      label: category.title,
      error: "",
    });

    setIsOpenCategoryDrawer(false);
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
        case "money":
        case "category":
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
      category: cloneData.category.value as string,
      wallet: cloneData.wallet.value as string,
      note: (cloneData.note.value || "") as string,
      notReportFlg: cloneData.notReportFlg.value as boolean,
      datetime: `${cloneData.date.value} ${cloneData.time.value}` as string,
    };
  };

  const onSubmit = () => {
    const data = parseData();

    if (!data) {
      return;
    }

    dispatch(fetchStoreTransaction({ data, email: user.email })).then(
      ({ payload }: any) => {
        const walletIndex = wallets.findIndex((wallet) => payload.walletId === wallet.id)

        dispatch(
          fetchChangeBalance({ id: payload.walletId, money: wallets[walletIndex].money + payload.balance })
        );
      }
    );

    router.push("/");
  };

  return (
    <Layout title="Thêm giao dịch" submit={onSubmit}>
      <Field prefix={"ICON"} errorMsg={formState.money.error} required>
        <FieldStyle.FieldNumber
          addonAfter="đ"
          placeholder="Nhập số tiền"
          formatter={(value) =>
            `${(value as string).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          }
          value={formState.money.label}
          onChange={(value) => handleChangeFormState("money", { value })}
          onFocus={() => handleChangeFormState("money", { error: "" })}
        />
      </Field>
      <Field
        prefix={"ICON"}
        errorMsg={formState.category.error}
        required
        onClick={onOpenCategoryDrawer}
      >
        <FieldStyle.DrawerControl>
          <Space>
            {formState.category.value ? (
              <span className="value">{formState.category.label}</span>
            ) : (
              <span className="placeholder">Chọn danh mục</span>
            )}
            <span className="down-icon">
              <DownOutlined />
            </span>
          </Space>
        </FieldStyle.DrawerControl>
      </Field>
      <Field
        prefix={"ICON"}
        errorMsg={formState.wallet.error}
        required
        onClick={onOpenWalletDrawer}
      >
        <FieldStyle.DrawerControl>
          <Space>
            {formState.wallet.value ? (
              <span className="value">{formState.wallet.label}</span>
            ) : (
              <span className="placeholder">Chọn ví</span>
            )}
            <span className="down-icon">
              <DownOutlined />
            </span>
          </Space>
        </FieldStyle.DrawerControl>
      </Field>
      <Field prefix={"ICON"}>
        <FieldStyle.DateTimePicker>
          <DatePicker
            className="date"
            format="DD/MM/YYYY"
            disabledDate={disabledDate}
            value={dayjs(formState.date.value, "DD/MM/YYYY")}
            onChange={(_, value) => handleChangeFormState("date", { value })}
          />
          <TimePicker
            value={dayjs(formState.time.value, "HH:mm")}
            format={"HH:mm"}
            onChange={(_, value) => handleChangeFormState("time", { value })}
          />
        </FieldStyle.DateTimePicker>
      </Field>
      <Field prefix={"ICON"}>
        <FieldStyle.Input>
          <Input
            placeholder="Ghi chú"
            value={formState.note.label}
            onChange={(e) =>
              handleChangeFormState("note", { value: e.target.value })
            }
          />
        </FieldStyle.Input>
      </Field>
      <Field>
        <FieldStyle.ReportMode>
          <span className="label">Không đưa vào báo cáo</span>
          <Switch
            checked={formState.notReportFlg.value}
            onChange={(value) =>
              handleChangeFormState("notReportFlg", { value })
            }
          />
        </FieldStyle.ReportMode>
      </Field>
      <ChoiceWalletDrawer
        isOpen={isOpenWalletDrawer}
        setDisplay={setIsOpenWalletDrawer}
        onChange={onChangeWallet}
        data={wallets.filter((_wallet, index) => index > 0)}
        height="100vh"
        placement="bottom"
      />
      <ChoiceCategoryDrawer
        isOpen={isOpenCategoryDrawer}
        setDisplay={setIsOpenCategoryDrawer}
        height="100vh"
        placement="bottom"
        onChange={onChangeCategory}
        data={categories}
      />
    </Layout>
  );
};

export default TransactionCreate;
