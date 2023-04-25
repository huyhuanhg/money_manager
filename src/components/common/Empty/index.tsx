import { FC } from "react";
import Container, * as Style from "./Empty.style";
import EmptyProps from "./Empty.props";

const Empty: FC<EmptyProps> = ({ imgUrl, description }) => (
  <Container
    image={imgUrl || "/book.png"}
    description={
      <Style.Description>
        {description || "Chưa có giao dịch nào!"}
      </Style.Description>
    }
  />
);

export default Empty;
