import { createSlice } from "@reduxjs/toolkit";
import TransactionReducerType from "@/types/reducers/TransactionReducerType";
import {
  fetchFirstPaginateOwnedTransactions,
  fetchPaginateOwnedTransactions,
} from "./action";

const initialState: TransactionReducerType = {
  data: [],
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
  },
});

export default transaction.reducer;
