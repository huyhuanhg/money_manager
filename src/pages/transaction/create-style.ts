import { Form } from "antd";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  ul {
    margin: 5px 0;
    padding: 0px;
    display: flex;
    background-color: #262626;
    border-radius: 5px;
    .mode-icon {
      position: relative;
      padding: 5px 15px;
      list-style: none;
      border-radius: 5px;
      cursor: pointer;
      z-index: 1;

      &:not(:last-child)::after {
        position: absolute;
        top: 50%;
        right: 0;
        content: "";
        display: block;
        height: 70%;
        border-right: 1px solid #8c8c8c;
        transform: translateY(-50%);
        z-index: 1;
      }

      &.active {
        background-color: #20c997;
      }
    }
  }
`;

const Container = styled.div`
  background-color: #8c8c8c;
`;

const Field = styled.div`
  display: flex;
  gap: 5px;
  border-bottom: 1px solid #bfbfbf;
  padding-bottom: 15px;

  .icon {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FormControl = styled(Form.Item)`
  flex: 1;
  margin: 0;
  .ant-form-item-label {
    padding: 0 11px;
    color: #fff;

    label {
      color: #fff;
      font-size: 16px;
    }
    .ant-form-item-required::before {
      display: none !important;
    }
  }

  [class*="ant-input"] {
    width: 100%;
    color: #fff;
  }

  [class*="ant-input"],
  [class*="ant-input"]:focus {
    background: unset !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

export { Nav, Container, FormControl, Field };
