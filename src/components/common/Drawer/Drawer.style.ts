import { Drawer } from "antd";
import styled from "styled-components";
export const Container = styled(Drawer)<{ btnClosePos?: "left" | "right" }>`
  background: #434343 !important;
  .ant-drawer-header {
    .ant-drawer-title {
      color: #fff;
    }
    .ant-drawer-close {
      color: #fff;
      ${(props) => (props.btnClosePos === "right" ? "margin: 0" : "")};
      ${(props) => (props.btnClosePos === "right" ? "order: 1" : "")};
    }
  }
  .ant-drawer-body {
    padding: 0;
  }
`;
