import CategoryReducerType from "@/types/reducers/CategoryReducerType";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOwnedCategories } from "./action";

const initialState: CategoryReducerType = {
  data: [],
  formatData: []
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllOwnedCategories.fulfilled, (state, { payload }) => {
      return {
        ...state,
        data: payload.categories,
        formatData: payload.formatCategories,
      };
    });
  },
});

export default category.reducer;
