import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOwnedWallet } from "./action";
import WalletReducerType from "@/types/reducers/WalletReducerType";

const initialState: WalletReducerType = {
  data: [
    {
      id: "default",
      money: 0,
      icon: "",
      title: "Tất cả",
    }
  ],
  active: 0,
};

const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllOwnedWallet.fulfilled, (state, { payload }) => {
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
    builder.addCase('wallet/changeActive', (state, { payload }: any) => {
      return {
        ...state,
        active: payload.index,
      };
    });
  },
});

export default wallet.reducer;
