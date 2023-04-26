import { FC } from "react";
import { Container } from "./Extension.style";
import Link from "next/link";

const Extension: FC = () => {
  return (
    <Container>
      <span>Chức năng chưa tích hợp</span>
      <Link href="/">Quay lại</Link>
    </Container>
  );
};

export default Extension;
