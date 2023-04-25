import Category from "@/types/entities/CategoryType";
import { FormatData as CategoryFormatData } from "@/types/reducers/CategoryReducerType";

export default interface CategoriesProps {
  categories: CategoryFormatData[]
  onSelected: Function
}
