import { FC, ReactNode, useEffect } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import { auth, db } from "@/configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc, increment } from "firebase/firestore";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [loggedInUser, loading] = useAuthState(auth);
  const { push } = useRouter();

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInUser?.email as string),
          {
            email: loggedInUser?.email,
            last_seen: serverTimestamp(),
            photo_url: loggedInUser?.photoURL,
          },
          { merge: true }
        );
      } catch (error) {
        console.error("ERROR SET USER INFO IN DB", error);
      }
    };

    const setWalletDefault = async () => {
      try {
        await setDoc(
          doc(db, "wallets", `${loggedInUser?.email}__default`),
          {
            user: loggedInUser?.email as string,
            title: 'Tất cả',
            icon: 'A',
            money: increment(0)
          },
          { merge: true }
        );
      } catch (error) {
        console.error("ERROR SET DEFAULT WALLET INFO IN DB", error);
      }
    }
    if (!loading && !loggedInUser) {
      push("/login");
    }
    if (loggedInUser) {
      setUserInDb();
      setWalletDefault()
    }
  }, [loading, loggedInUser, push]);

  return (
    <>
      <Head>
        <title>Money Manager</title>
        <meta name="description" content="Quản lý túi tiền" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="layout">
        {loading ? (
          <Loading full />
        ) : (
          <>
            {children}
            <Navigation />
          </>
        )}
      </main>
    </>
  );
};

export default Layout;
