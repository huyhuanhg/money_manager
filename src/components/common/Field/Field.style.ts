import { InputNumber, Space } from "antd";
import styled, { css } from "styled-components";

const Container = styled.div<{ required?: boolean }>`
  position: relative;
  display: flex;
  background: #646464;
  padding: 10px 15px ${(props) => (props.required ? "20px" : "10px")};
  margin-bottom: 10px;

  .cus-field--prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    margin-right: 10px;
    overflow: hidden;
  }

  .cus-field--body {
    flex: 1;
  }

  .cus-field--body > * {
    width: 100%;
  }

  .cus-field--error {
    position: absolute;
    right: 26px;
    color: red;
    bottom: 5px;
    font-size: 1rem;
  }
`;

const wrapper = css`
  background: unset;
  border: none;
  box-shadow: none;
  line-height: 35px;
`;

const control = css`
  line-height: 35px;
  height: auto !important;
  text-align: right !important;
  color: #fff !important;
  font-size: 20px !important;

  &::placeholder {
    color: #c5c5c5 !important;
  }
`;

const mark = css`
  display: inline-block;
  width: 40px;
  color: #fff;
  text-align: center;
`;

export const FieldNumber = styled(InputNumber)`
  ${wrapper}
  .ant-input-number-handler-wrap {
    display: none;
  }

  input {
    ${control}
  }

  .ant-input-number-group-addon {
    border: none;
    background: unset;
    font-size: 20px;
    padding: 0;
    ${mark}
  }
`;

export const DrawerControl = styled.div`
  line-height: 35px;
  .ant-space {
    font-size: 20px;
    gap: 0 !important;
    width: 100%;

    .ant-space-item:first-of-type {
      flex: 1;
    }
    .placeholder {
      display: inline-block;
      padding: 0 11px;
      color: #c5c5c5;
      text-align: right;
      width: 100%;
    }
    .value {
      display: inline-block;
      padding: 0 11px;
      color: #fff;
      text-align: right;
      width: 100%;
    }
    .down-icon {
      ${mark}
    }
  }
`;

export const DateTimePicker = styled.div`
  line-height: 35px;
  display: flex;
  height: 35px;
  .ant-picker {
    flex: 1 1 50%;
    background: unset;
    border: none;
    box-shadow: none;
    line-height: 35px;
    padding: 0;

    .ant-picker-suffix {
      margin: 0;
      width: 40px;
      font-size: 20px;
      color: #fff;
      justify-content: center;
    }

    &.date {
      .ant-picker-suffix {
        display: none;
      }
    }

    input {
      padding: 0 11px;
      font-size: 20px;
      color: #fff;
      text-align: right;
    }

    .ant-picker-clear {
      display: none;
    }
  }
`;

export const Input = styled.div`
  input {
    ${control}
    ${wrapper}
    padding: 0 11px;
    &:hover,
    &:focus {
      box-shadow: none;
    }
  }
`;

export const ReportMode = styled(Space)`
  line-height: 35px;
  font-size: 16px;
  color: #fff;
  justify-content: space-between;
  .ant-switch.ant-switch-checked {
    background: #597ef7 !important;
  }
`;

export default Container;
