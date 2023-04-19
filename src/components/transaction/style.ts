import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  background: #1f1f1f;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  z-index: 100;
`;

const Title = styled.h2``;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Control = styled(Button)<{ primary?: boolean }>`
  color: #fff;
  border-radius: 2px;
  background: ${({ primary }: any) => (primary ? "#20c997" : "#595959")};
  border-color: ${({ primary }: any) => (primary ? "#20c997" : "#595959")};

  &:hover {
    color: #fff !important;
    border-color: ${({ primary }: any) =>
      primary ? "#20c997" : "#595959"} !important;
  }
`;

export { Wrapper, Title, ControlGroup, Control };
