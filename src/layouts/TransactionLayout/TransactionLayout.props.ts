import { ReactNode } from "react";

export default interface TransactionLayoutProps {
  title: string
  children: ReactNode;
  submit: Function
}
