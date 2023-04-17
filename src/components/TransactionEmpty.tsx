import { Empty } from "antd";
import { FC } from "react";
import styles from "@/styles/TransactionEmpty.module.css";

interface Props {
  imgUrl?: string;
  description?: string;
}

const TransactionEmpty: FC<Props> = ({ imgUrl, description }) => (
  <Empty
    className={styles.empty}
    image={imgUrl || "/book.png"}
    description={
      <span className={styles.description}>
        {description || "Chưa có giao dịch nào!"}
      </span>
    }
  ></Empty>
);

export default TransactionEmpty;
