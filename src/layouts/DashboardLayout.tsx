import { FC, ReactNode } from "react";
import Navigation from "@/components/Navigation";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <main className="layout">
      {children}
      <Navigation />
    </main>
  );
};

export default DashboardLayout;
