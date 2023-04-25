import { FC, useEffect, useState } from "react";
import TransactionsProps from "./Transactions.props";
import Container, * as Style from "./Transactions.style";
import Transaction from "@/types/entities/TransactionType";
import dayjs from "dayjs";
import moment from "moment";
import "moment/locale/vi";
import { arrKeyBy, dayOfWeek } from "@/helpers/datetime";
import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "@/configs";
import { useSelector } from "react-redux";
import CategoryReducerType from "@/types/reducers/CategoryReducerType";
import Category from "@/types/entities/CategoryType";
import { useRouter } from "next/router";

const Transactions: FC<TransactionsProps> = ({ data }) => {
  const router = useRouter();

  const { data: categories } = useSelector(
    ({ categoryReducer: categories }: Record<string, CategoryReducerType>) =>
      categories
  );

  const [categoriesByKey, setCategoriesByKey] = useState<
    Record<string, Category>
  >({});

  useEffect(() => {
    if (categories.length > 0) {
      setCategoriesByKey(arrKeyBy(categories, "id"));
    }
  }, [categories]);

  const prepareData = (data: Transaction[]) => {
    const result: Record<string, Record<string, any>> = {};

    data.forEach((transaction) => {
      const key = dayjs(transaction.datetime, DATETIME_FORMAT).format(
        DATE_FORMAT
      );

      if (
        result[key] &&
        result[key].constructor === Object &&
        Array.isArray(result[key].transactions)
      ) {
        result[key] = {
          total:
            result[key].total +
            (transaction.notReportFlg ? 0 : transaction.money),
          transactions: [...result[key].transactions, transaction],
        };
        return;
      }

      result[key] = {
        total: transaction.notReportFlg ? 0 : transaction.money,
        transactions: [transaction],
      };
    });

    return result;
  };

  const renderTransactions = () => {
    const formatData = prepareData(data);
    return Object.keys(formatData).map((key) => {
      const date = moment(key, DATE_FORMAT);
      const viDay = dayOfWeek(date);
      const expenseTotal = formatData[key].total;
      return (
        <Style.TransactionDate key={key}>
          <Style.TransactionSummary>
            <div className="date-info">
              <div className="day-of-week">{viDay}</div>
              <div className="date">{date.locale("vi").format("L")}</div>
            </div>
            <div className="expense-total">
              <span className={expenseTotal > 0 ? "increment" : "minus"}>
                {`${new Intl.NumberFormat().format(Math.abs(expenseTotal))}`}
                <span className="unit">đ</span>
              </span>
            </div>
          </Style.TransactionSummary>
          <Style.TransactionList>
            {formatData[key].transactions.map((transaction: Transaction) => (
              <Style.TransactionItem
                key={transaction.id}
                onClick={() => router.push(`/transaction?id=${transaction.id}`)}
              >
                <div className="category-icon">
                  <span className="icon">
                    {categoriesByKey[transaction.category]?.icon}
                  </span>
                </div>
                <div className="transaction--info">
                  <div className="category-title">
                    {categoriesByKey[transaction.category]?.title}
                  </div>
                  <div className="transaction-note">{transaction.note}</div>
                </div>
                <div className="expense--info">
                  <div className="expense">
                    <span
                      className={transaction.money > 0 ? "increment" : "minus"}
                    >
                      {`${new Intl.NumberFormat().format(
                        Math.abs(transaction.money)
                      )}`}
                      <span className="unit">đ</span>
                    </span>
                  </div>
                  <div className="time">
                    {moment(transaction.datetime, DATETIME_FORMAT).format(
                      TIME_FORMAT
                    )}
                  </div>
                </div>
              </Style.TransactionItem>
            ))}
          </Style.TransactionList>
        </Style.TransactionDate>
      );
    });
  };

  return <Container>{renderTransactions()}</Container>;
};

export { default as Navigation } from "./Navigation";
export { default as Drawer } from "./Drawer";
export default Transactions;
