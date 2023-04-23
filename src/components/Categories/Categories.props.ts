import Category from "@/types/entities/CategoryType";

export default interface CategoriesProps {
  categories: Category[]
  onSelected: Function
}
