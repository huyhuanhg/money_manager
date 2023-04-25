import { FC } from "react";
import Navigation from "@/components/Navigation";
import DashboardLayoutProps from "./DashboardLayout.props";

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="layout">
      {children}
      <Navigation />
    </main>
  );
};

export default DashboardLayout;
