import { Empty } from "antd";
import styled from "styled-components";

const Container = styled(Empty)`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Description = styled.span`
  color: #fff;
`;

export default Container;
