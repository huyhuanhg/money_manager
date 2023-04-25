import { FC, useEffect } from "react";
import { auth } from "@/configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/stores/auth/action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Loading } from "@/components/common";
import AuthLayoutProps from "./AuthLayout.props";

const Layout: FC<AuthLayoutProps> = ({ component: Component, ...pageProps }) => {
  const [loggedInUser, loading] = useAuthState(auth);
  const { push } = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  useEffect(() => {
    if (!loading && !loggedInUser) {
      push("/login");
    }

    if (loggedInUser) {
      const {email, displayName, photoURL} = loggedInUser
      dispatch(fetchLogin({email, displayName, photoURL}))
    }
  }, [dispatch, loading, loggedInUser, push]);

  return (
    <main>
      {loading && <Loading full/>}
      {loggedInUser && loggedInUser?.email && <Component {...pageProps} user={loggedInUser} />}
    </main>
  );
};

export default Layout;
