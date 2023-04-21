import { Spin } from "antd";
import styles from "@/styles/Loading.module.css";
import { FC, ReactNode } from "react";
import { FieldWrapper } from "@/styles/FieldStyle";
import { Container } from "./Field.style";
import FieldProps from "./Field.props";

const Field: FC<FieldProps> = ({ children, prefix, suffix }) => {
  return (
    <Container>
      {prefix && <div className="cus-field--prefix">{prefix}</div>}
      <div className="cus-field--body">{children}</div>
      {suffix && <div className="cus-field--suffix">{suffix}</div>}
    </Container>
  );
};

export default Field;
