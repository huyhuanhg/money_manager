import AuthLayout from "@/layouts/AuthLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HTML: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Money Manager</title>
        <meta name="description" content="Quản lý túi tiền" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
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
