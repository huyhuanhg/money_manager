import AuthLayout from "@/layouts/AuthLayout";
import store from "@/stores";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";

interface Props {
  children: ReactNode;
}

const theme = {
  token: {
    colorPrimary: "#20c997",
    colorBgLayout: "#5e5e5e",
    borderRadius: 3,
  },
};

const HTML: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Head>
          <title>Money Manager</title>
          <meta name="description" content="Quản lý túi tiền" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </ConfigProvider>
    </Provider>
  );
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  if (router.pathname.match("/login")) {
    return (
      <HTML>
        <Component {...pageProps} />
      </HTML>
    );
  }

  return (
    <HTML>
      <AuthLayout {...pageProps} component={Component}></AuthLayout>
    </HTML>
  );
}
