import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOwnedWallets, fetchStoreWallet } from "./action";
import WalletReducerType from "@/types/reducers/WalletReducerType";

const initialState: WalletReducerType = {
  data: [
    {
      id: "default",
      money: 0,
      icon: "",
      title: "Tất cả",
    },
  ],
  active: 0,
};

const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllOwnedWallets.fulfilled, (state, { payload }) => {
      const totalMoney = payload.wallets.reduce((total, wallet) => {
        return (total += wallet.money);
      }, 0);

      const wallets = [
        {
          id: "default",
          money: totalMoney,
          icon: "",
          title: "Tất cả",
        },
        ...payload.wallets,
      ];

      return {
        ...state,
        data: wallets,
        active: 0,
      };
    });
    builder.addCase(fetchStoreWallet.fulfilled, (state, { payload }) => {
        const totalMoney = state.data[0].money + payload.wallet?.money;

        const wallets = [
          {
            ...state.data[0],
            money: totalMoney,
          },
          ...state.data,
          payload.wallet
        ];

        return {
          ...state,
          data: wallets,
        };
    });
    builder.addCase("wallet/changeActive", (state, { payload }: any) => {
      return {
        ...state,
        active: payload.index,
      };
    });
  },
});

export default wallet.reducer;
