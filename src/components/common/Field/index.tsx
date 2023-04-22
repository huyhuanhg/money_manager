import { FC } from "react";
import Container from "./Field.style";
import FieldProps from "./Field.props";

const Field: FC<FieldProps> = ({ children, prefix, errorMsg, required }) => {
  return (
    <Container required={required}>
      {prefix && <div className="cus-field--prefix">{prefix}</div>}
      <div className="cus-field--body">{children}</div>
      {errorMsg && <div className="cus-field--error">{errorMsg}</div>}
    </Container>
  );
};

export default Field;
