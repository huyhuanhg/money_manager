import { ReactNode } from "react";

export default interface FieldProps {
  children?: ReactNode;
  prefix?: ReactNode;
  errorMsg?: string;
  required?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
