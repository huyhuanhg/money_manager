import { Modal } from "antd";
import { FC } from "react";
import styles from "@/styles/ChoiceWalletModal.module.css";

interface Props {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
}

const ChoiceWalletModal: FC<Props> = ({ isOpen, setDisplay, onChange }) => {
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
        <li
          className={styles.walletItem}
          onClick={() => onChange({ icon: "A", title: "Tất cả", money: 1000000 })}
        >
          <div className={styles.walletInfo}>
            <span className={styles.walletIcon}>A</span>
            <span className={styles.walletTitle}>Tất cả</span>
          </div>
          <div className={styles.currentMoney}>1,000,000đ</div>
        </li>
        <li className={styles.walletItem} onClick={() => onChange({ icon: "T", title: "Tiền mặt", money: 100000 })}>
          <div className={styles.walletInfo}>
            <span className={styles.walletIcon}>T</span>
            <span className={styles.walletTitle}>Tiền mặt</span>
          </div>
          <div className={styles.currentMoney}>100000đ</div>
        </li>
      </ul>
    </Modal>
  );
};

export default ChoiceWalletModal;
