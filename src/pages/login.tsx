import { signIn } from "next-auth/react";
const Login = () => {
  const handleGoogleLogin = async () => {
    console.log('process.env :>> ', process.env);
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };
  return <button onClick={handleGoogleLogin}>Login</button>;
};

export default Login;
