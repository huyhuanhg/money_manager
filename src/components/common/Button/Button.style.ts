import { Button } from "antd";
import styled from "styled-components";
import ButtonProps from "./Button.props";

export const Container = styled(Button)<{ bg: string }>`
  font-size: 12px;
  ${({ bg }: ButtonProps) => bg ?? `background-color: ${bg}`}
`;
