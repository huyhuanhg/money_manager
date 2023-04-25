import { createSlice } from "@reduxjs/toolkit";
import TransactionReducerType from "@/types/reducers/TransactionReducerType";
import {
  fetchDeleteTransaction,
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
    builder.addCase(
      fetchDeleteTransaction.fulfilled,
      (state, { payload }: any) => {
        const cloneTrans = [...state.data]
        const transIndex = cloneTrans.findIndex(trans => trans.id === payload.id)

        if (-1 !== transIndex) {
          cloneTrans.splice(transIndex, 1)
        }

        return {
          ...state,
          data: [...cloneTrans]
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
