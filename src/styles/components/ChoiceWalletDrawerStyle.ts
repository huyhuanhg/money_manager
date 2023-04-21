import { Button, Drawer, Space } from "antd";
import styled from "styled-components";

const ChoiceWalletDrawerStyle = styled(Drawer)`
  .ant-drawer-header {
    .ant-drawer-close {
      margin: 0;
      order: 1;
      color: #fff;
      font-size: 20px;
    }
    .ant-drawer-title {
      color: #fff;
    }
  }
  .ant-drawer-body {
    padding: 0;
  }
`;

const ChoiceWalletDrawerFooterStyle = styled(Button)<{ label: string }>`
  width: 100%;
`;

export { ChoiceWalletDrawerStyle, ChoiceWalletDrawerFooterStyle };
