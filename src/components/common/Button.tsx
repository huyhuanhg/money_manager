import { Button, type ButtonProps } from "antd";
import { FC } from "react";

interface BtnProps extends ButtonProps {

}

const Btn: FC<BtnProps> = ({ children, type, ...props }) => {
  return <Button type={type ?? "primary"} {...props}>{children}</Button>;
};

export default Btn;
