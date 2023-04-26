import Category from "@/types/entities/CategoryType";
import { ReactNode } from "react";

export default interface ChoiceCategoryDrawerProps {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  height?: number | string;
  placement?: "top" | "bottom";
  data: Category[];
  footer?: ReactNode
}
