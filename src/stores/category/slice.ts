import CategoryReducerType from "@/types/reducers/CategoryReducerType";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOwnedCategories, fetchStoreCategory } from "./action";

const initialState: CategoryReducerType = {
  data: [],
  formatData: [],
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
    builder.addCase(fetchStoreCategory.fulfilled, (state, { payload }) => {
      const { category } = payload;
      const categories = [...state.data, category];
      const formatData = [...state.formatData];

      if (!category.parent_id) {
        formatData.push(category);
      } else {
        const parentCategoryIndex = formatData.findIndex(
          (cate) => cate.id === category.parent_id
        );

        if (-1 !== parentCategoryIndex) {
          formatData[parentCategoryIndex].child = [
            ...(formatData[parentCategoryIndex].child || []),
            category,
          ];
        }
      }

      return {
        ...state,
        data: categories,
        formatData: formatData,
      };
    });
  },
});

export default category.reducer;
