import { FC } from "react";
import TransactionsProps from "./Transactions.props";
import Container, * as Style from "./Transactions.style";
import Transaction from "@/types/entities/TransactionType";
import dayjs from "dayjs";
import moment from "moment";
import "moment/locale/vi";

import { unitOfTime } from "moment";

const Transactions: FC<TransactionsProps> = ({ data }) => {
  const prepareData = (data: Transaction[]) => {
    const result: Record<string, any[]> = {};

    console.log("dayjs().weekday(1) :>> ", moment().locale("vi").format("L"));
    data.forEach((transaction) => {
      const key = dayjs(transaction.datetime, "DD/MM/YYYY HH:mm").format(
        "DD/MM/YYYY"
      );

      if (result[key] && Array.isArray(result[key])) {
        result[key] = [...result[key], transaction];
        return;
      }
      result[key] = [transaction];
    });

    return result;
  };

  const getDay = (day: number) => {
    switch (day) {
      case 1:
        return "Thứ Hai";
      case 2:
        return "Thứ Ba";
      case 3:
        return "Thứ Tư";
      case 4:
        return "Thứ Năm";
      case 5:
        return "Thứ Sáu";
      case 6:
        return "Thứ Bảy";
      default:
        return "Chủ nhật";
    }
  };
  const renderTransactions = () => {
    const formatData = prepareData(data);

    return Object.keys(formatData).map((key) => {
      const date = moment(key, "DD/MM/YYYY");
      const viDay = getDay(Number(date.format("d")));
      return (
        <Style.TransactionDate key={key}>
          <div className="top">
            <div className="day-of-week">{viDay}</div>
            <div className="date">{date.locale("vi").format("L")}</div>
          </div>
        </Style.TransactionDate>
      );
    });
  };

  return <Container>{renderTransactions()}</Container>;
};

export { default as Navigation } from "./Navigation";
export { default as Drawer } from "./Drawer";
export default Transactions;
