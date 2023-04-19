import { FC, ReactNode } from "react";
import Header from "@/components/transaction/CreateHeader";

interface Props {
  children: ReactNode;
}

const TransactionCreateLayout: FC<Props> = ({ children }) => {
  return (
    <main className="layout-full">
    <Header />
    {children}
  </main>
  );
};

export default TransactionCreateLayout;
