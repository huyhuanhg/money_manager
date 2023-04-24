import Category from "../entities/CategoryType";
import AbstractReducerType from "./AbstractReducerType";

interface FormatData extends Category {
  child?: Category[] | null
}

export default interface CategoryReducerType  extends AbstractReducerType<Category> {
  formatData: FormatData[]
}
