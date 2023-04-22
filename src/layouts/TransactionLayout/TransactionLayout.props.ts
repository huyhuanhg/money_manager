import { ReactNode } from "react";

export default interface TransactionLayoutProps {
  type: string,
  title: string
  children: ReactNode;
}
