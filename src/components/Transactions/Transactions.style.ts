import styled, { css } from "styled-components";

const Container = styled.div`
  padding: 20px 0;
`;

const priceCss = css`
  display: flex;
  align-items: center;
  font-weight: bold;
  span {
    display: inline-block;
    position: relative;
    &::before {
      position: absolute;
      display: block;
      left: -13px;
    }
    &.minus {
      &::before {
        content: "-";
      }
      color: #ff4d4f;
    }

    &.increment {
      &::before {
        content: "+";
      }
      color: #73d13d;
    }
    .unit {
      display: inline-block;
      margin-left: 5px;
    }
  }
`;

export const TransactionDate = styled.div`
  margin-bottom: 10px;
`;

export const TransactionSummary = styled.div`
  display: flex;
  padding: 5px 15px;
  background: #262626;
  border-bottom: 1px solid #595959;
  .date-info {
    flex: 1;
    .day-of-week {
      font-size: 22px;
      font-weight: bold;
    }
  }

  .expense-total {
    font-size: 22px;
    ${priceCss}
  }

  .expense-total {
  }
`;

export const TransactionList = styled.div``;

export const TransactionItem = styled.div`
  display: flex;
  padding: 5px 15px 5px 20px;
  background: #434343;
  border-bottom: 1px solid #525151;
  cursor: pointer;

  &:hover {
    background: #595959;
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    margin-right: 5px;
    .icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #525151;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .transaction--info {
    flex: 1;
    .category-title {
      line-height: 20px;
      font-size: 14px;
      color: #d9d9d9;
    }

    .transaction-note {
      line-height: 20px;
      font-size: 12px;
      color: #bfbfbf;
    }
  }

  .expense--info {
    .expense {
      ${priceCss}
      justify-content: end;
      font-size: 18px;
      font-weight: normal;
    }

    .time {
      font-size: 14px;
      text-align: end;
      color: #bfbfbf;
    }
  }
`;
export default Container;
