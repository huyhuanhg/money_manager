import { Modal } from "antd";
import { FC } from "react";
import styles from "@/styles/ChoiceWalletModal.module.css";
import Wallet from "@/types/entities/WalletType";

interface Props {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  data: Wallet[]
}

const ChoiceWalletModal: FC<Props> = ({
  isOpen,
  setDisplay,
  onChange,
  data,
}) => {
  return (
    <Modal
      wrapClassName="antd-modal"
      className={styles.choiceWalletModal}
      open={isOpen}
      closable={false}
      footer={false}
      style={{
        top: 0,
        marginTop: 15,
      }}
      onCancel={() => setDisplay(false)}
    >
      <ul className={styles.walletList}>
        {data.map((wallet: Wallet, index) => (
          <li
            key={wallet.id}
            className={styles.walletItem}
            onClick={() =>
              onChange({ index })
            }
          >
            <div className={styles.walletInfo}>
              <span className={styles.walletIcon}>{wallet.icon}</span>
              <span className={styles.walletTitle}>{wallet.title}</span>
            </div>
            <div className={styles.currentMoney}>{new Intl.NumberFormat().format(wallet.money)}đ</div>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ChoiceWalletModal;
