import { FC, ReactNode } from "react";
import Header from "@/components/transaction/CreateHeader";

interface Props {
  children: ReactNode;
  title: string
}

const TransactionCreateLayout: FC<Props> = ({ children, title }) => {
  return (
    <main className="layout-full">
    <Header title={title} />
    {children}
  </main>
  );
};

export default TransactionCreateLayout;
