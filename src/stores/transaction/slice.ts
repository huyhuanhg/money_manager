import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TransactionReducerType from "@/types/reducers/TransactionReducerType";
import {
  fetchFirstPaginateOwnedTransactions,
  fetchPaginateOwnedTransactions,
  fetchTransactionById,
} from "./action";

const initialState: TransactionReducerType = {
  data: [],
  detail: undefined,
};

const transaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchPaginateOwnedTransactions.fulfilled,
      (state, { payload }: any) => {
        return {
          ...state,
          data: [...state.data, ...payload.transactions],
        };
      }
    );
    builder.addCase(
      fetchFirstPaginateOwnedTransactions.fulfilled,
      (state, { payload }: any) => {
        return {
          ...state,
          data: [...payload.transactions],
        };
      }
    );
    builder.addCase(
      fetchTransactionById.fulfilled,
      (state, { payload }: any) => {
        return {
          ...state,
          detail: { ...payload.transaction },
        };
      }
    );
    builder.addCase("transaction/clear_detail", (state) => {
      return {
        ...state,
        detail: undefined,
      };
    });
  },
});

export default transaction.reducer;
