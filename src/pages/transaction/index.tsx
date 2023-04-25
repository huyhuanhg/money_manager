import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import Layout from "@/layouts/TransactionLayout";
import { useEffect, useState } from "react";
import { Input, Space, Switch, TimePicker } from "antd";
import * as FieldStyle from "@/components/common/Field/Field.style";
import { Button, DatePicker, Field } from "@/components/common";
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
import {
  fetchDeleteTransaction,
  fetchStoreTransaction,
  fetchTransactionById,
  fetchUpdateTransaction,
} from "@/stores/transaction/action";
import { useRouter } from "next/router";
import CategoryReducerType from "@/types/reducers/CategoryReducerType";
import TransactionReducerType from "@/types/reducers/TransactionReducerType";
import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "@/configs";

const TransactionCreate = ({ user }: AuthComponentProps) => {
  const router = useRouter();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: wallets } = useSelector(
    ({ walletReducer: wallets }: Record<string, WalletReducerType>) => wallets
  );

  const { formatData: categories, data: baseCategories } = useSelector(
    ({ categoryReducer: categories }: Record<string, CategoryReducerType>) =>
      categories
  );

  const { detail: transaction } = useSelector(
    ({ transactionReducer: detail }: Record<string, TransactionReducerType>) =>
      detail
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
    const { id } = router.query;

    if (id) {
      dispatch(fetchTransactionById({ id }));
    }

    dispatch(fetchAllOwnedCategories({ email: user.email }));
    dispatch(fetchAllOwnedWallets({ email: user.email }));

    return () => {
      dispatch({ type: "transaction/clear_detail" });
    };
  }, []);

  useEffect(() => {
    if (wallets.length && baseCategories.length && transaction) {
      const walletInfo = wallets.find(
        (wallet) => wallet.id === transaction.wallet
      );
      const categoryInfo = baseCategories.find(
        (category) => category.id === transaction.category
      );

      const now = dayjs(transaction.datetime, DATETIME_FORMAT);

      const state = {
        ...formState,
      };

      Object.assign(state, {
        money: {
          ...state.money,
          value: Math.abs(transaction.money),
        },
        category: {
          ...state.category,
          value: transaction.category,
          label: categoryInfo?.title,
        },
        wallet: {
          ...state.wallet,
          value: transaction.wallet,
          label: walletInfo?.title,
        },
        date: {
          value: now.format(DATE_FORMAT),
        },
        time: {
          value: now.format(TIME_FORMAT),
        },
        note: {
          value: transaction.note,
        },
        notReportFlg: {
          value: transaction.notReportFlg,
        },
      });

      setFormState(state);
    }
  }, [transaction, wallets, baseCategories]);

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

    const { id } = router.query;
    if (id) {
      dispatch(fetchUpdateTransaction({ data, id })).then(
        ({ payload }: any) => {
          const walletIndex = wallets.findIndex(
            (wallet) => payload.walletId === wallet.id
          );
          dispatch(
            fetchChangeBalance({
              id: payload.walletId,
              money:
                wallets[walletIndex].money +
                Math.abs(transaction?.money as number) +
                payload.balance,
            })
          ).then(() => router.push("/"));
        }
      );
    } else {
      dispatch(fetchStoreTransaction({ data, email: user.email })).then(
        ({ payload }: any) => {
          const walletIndex = wallets.findIndex(
            (wallet) => payload.walletId === wallet.id
          );

          dispatch(
            fetchChangeBalance({
              id: payload.walletId,
              money: wallets[walletIndex].money + payload.balance,
            })
          ).then(() => router.push("/"));
        }
      );
    }
  };

  const onDelete = () => {
    if (!transaction) {
      return;
    }

    dispatch(fetchDeleteTransaction({ id: transaction.id })).then(() => {
      const walletIndex = wallets.findIndex(
        (wallet) => transaction.wallet === wallet.id
      );

      dispatch(
        fetchChangeBalance({
          id: transaction.wallet,
          money: wallets[walletIndex].money + Math.abs(transaction.money),
        })
      ).then(() => router.push("/"));
    });
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
          value={formState.money.value}
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
            format={DATE_FORMAT}
            disabledDate={disabledDate}
            value={dayjs(formState.date.value, DATE_FORMAT)}
            onChange={(_, value) => handleChangeFormState("date", { value })}
          />
          <TimePicker
            value={dayjs(formState.time.value, TIME_FORMAT)}
            format={TIME_FORMAT}
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
      <Field
        onClick={() =>
          handleChangeFormState("notReportFlg", {
            value: !formState.notReportFlg.value,
          })
        }
      >
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
      {transaction && (
        <Button
          danger
          style={{ margin: "0 20px", width: "calc(100% - 40px)" }}
          onClick={onDelete}
        >
          Xóa
        </Button>
      )}
    </Layout>
  );
};

export default TransactionCreate;
