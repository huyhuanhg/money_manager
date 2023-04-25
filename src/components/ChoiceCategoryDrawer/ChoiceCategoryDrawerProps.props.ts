import Category from "@/types/entities/CategoryType";

export default interface ChoiceCategoryDrawerProps {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  height?: number | string;
  placement?: "top" | "bottom";
  data: Category[];
}
