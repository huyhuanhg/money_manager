import { Spin } from "antd";
import styles from "@/styles/Loading.module.css";
import { FC } from "react";

interface Props {
  full: boolean;
}

const Loading: FC<Props> = ({full}) => {
  return <div className={full ? styles.wrapperFull : styles.wrapper}><Spin /></div>;
}

export default Loading
