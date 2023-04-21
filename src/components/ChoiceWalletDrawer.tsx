import { Button } from "antd";
import { FC } from "react";
import styles from "@/styles/ChoiceWalletModal.module.css";
import Wallet from "@/types/entities/WalletType";
import {
  ChoiceWalletDrawerStyle,
} from "@/styles/components/ChoiceWalletDrawerStyle";

interface Props {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  data: Wallet[];
}


const ChoiceWalletDrawer: FC<Props> = ({
  isOpen,
  setDisplay,
  onChange,
  data,
}) => {
  const onClose = () => {
    setDisplay(false);
  };
  return (
    <ChoiceWalletDrawerStyle
      title={<div className="title">Chọn ví</div>}
      placement="top"
      open={isOpen}
      onClose={onClose}
      height="auto"
      key="top"
      footer={
        <Button type="primary">Thêm ví</Button>
      }
      style={{ background: "#434343", color: "#fff" }}
    >
      <ul className={styles.walletList}>
        {data.map((wallet: Wallet, index) => (
          <li
            key={wallet.id}
            className={styles.walletItem}
            onClick={() => onChange({ index })}
          >
            <div className={styles.walletInfo}>
              <span className={styles.walletIcon}>{wallet.icon}</span>
              <span className={styles.walletTitle}>{wallet.title}</span>
            </div>
            <div className={styles.currentMoney}>
              {new Intl.NumberFormat().format(wallet.money)}đ
            </div>
          </li>
        ))}
      </ul>
    </ChoiceWalletDrawerStyle>
  );
};

export default ChoiceWalletDrawer;
