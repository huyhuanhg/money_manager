import { FC } from "react";
import TransactionLayoutProps from "./TransactionLayout.props";
import Drawer from "@/components/transactions/Drawer";

const TransactionLayout: FC<TransactionLayoutProps> = ({
  title,
  type,
  children,
}) => {
  return (
    <main className="layout-full">
      <Drawer title={title} type={type}>
        {children}
      </Drawer>
    </main>
  );
};

export default TransactionLayout;
