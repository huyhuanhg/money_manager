import { FC, ReactNode } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Money Manager</title>
        <meta name="description" content="Quản lý túi tiền" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="layout">
        {children}
        <Navigation />
      </main>
    </>
  );
};

export default Layout;
