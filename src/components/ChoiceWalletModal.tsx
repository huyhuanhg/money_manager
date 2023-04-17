import { Modal } from "antd";
import { FC } from "react";
import styles from "@/styles/ChoiceWalletModal.module.css";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

interface Props {
  isOpen: boolean;
  setDisplay: Function;
  onChange: Function;
  data: QuerySnapshot<DocumentData> | undefined;
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
        {data?.docs.map((wallet: DocumentData) => (
          <li
            key={wallet.id}
            className={styles.walletItem}
            onClick={() =>
              onChange({ icon: wallet?.data().icon, title: wallet?.data().title, money: wallet?.data().money })
            }
          >
            <div className={styles.walletInfo}>
              <span className={styles.walletIcon}>{wallet?.data().icon}</span>
              <span className={styles.walletTitle}>{wallet?.data().title}</span>
            </div>
            <div className={styles.currentMoney}>{new Intl.NumberFormat().format(wallet?.data().money || 0)}đ</div>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ChoiceWalletModal;
