import { ReactNode } from "react";

export default interface DrawerProps {
  children?: ReactNode;
  prefix?: ReactNode;
  errorMsg?: string;
  required?: boolean;
}
