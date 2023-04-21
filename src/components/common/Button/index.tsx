import { FC, useEffect } from "react";
import ButtonProps from "./Button.props";
import { Container } from "./Button.style";
import { theme } from "antd";

const Button: FC<ButtonProps> = ({ children, type, ...props }) => {
  const { token } = theme.useToken();

  useEffect(() => {
    console.log('token :>> ', token);
  }, [token])

  return (
    <Container type={type ?? "primary"} {...props} bg={token.blue1 as string}>
      {children}
    </Container>
  );
};

export default Button;
