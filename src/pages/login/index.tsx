import { auth } from "@/configs/firebase";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Loading } from "@/components/common";
import { Container } from "./Login.style";

const Login = () => {
  const [singInWithGoogle, _user, _loading, _err] = useSignInWithGoogle(auth);
  const [loggedInUser, loading] = useAuthState(auth);
  const { push } = useRouter();

  const handleGoogleLogin = () => {
    singInWithGoogle();
  };

  useEffect(() => {
    if (loggedInUser) {
      push("/");
    }
  }, [loggedInUser, push]);

  if (loading) {
    return <Loading full />;
  }

  return <Container>
    <Button onClick={handleGoogleLogin} type="primary">Đăng nhập</Button>
  </Container>;
};

export default Login;
