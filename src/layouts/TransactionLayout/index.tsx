import { FC } from "react";
import TransactionLayoutProps from "./TransactionLayout.props";
import Drawer from "@/components/Transactions/Drawer";

const TransactionLayout: FC<TransactionLayoutProps> = ({
  title,
  submit,
  children,
}) => {
  return (
    <main className="layout-full">
      <Drawer title={title} submit={submit}>
        {children}
      </Drawer>
    </main>
  );
};

export default TransactionLayout;
