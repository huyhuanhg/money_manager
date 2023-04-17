import styles from "@/styles/Home.module.css";
import Layout from "@/layouts/Layout";
import TransactionEmpty from "@/components/TransactionEmpty";
import ChoiceWalletModal from "@/components/ChoiceWalletModal";
import { useState } from "react";
import { auth, db } from "@/configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";

const Home = () => {
  const [loggedInUser, _loading] = useAuthState(auth);

  const [isOpenChoiceWallet, setIsOpenChoiceWallet] = useState(false);
  const [currentWallet, setCurrentWallet] = useState({
    icon: "A",
    title: "Tất cả",
    money: 0,
  });

  const q = query(
    collection(db, "wallets"),
    where("user", "==", loggedInUser?.email || 'Unknown')
  );
  const [wallets, __loading, __err] = useCollection(q);


  const showChoiceWalletModal = () => {
    setIsOpenChoiceWallet(true);
  };

  const onChangeCurrentWallet = (data: any) => {
    setCurrentWallet(data);
    setIsOpenChoiceWallet(false);
  };

  return (
    <Layout>
      <div className={styles.currentWallet} onClick={showChoiceWalletModal}>
        <div className={styles.walletInfo}>
          <span className={styles.walletIcon}>{currentWallet?.icon}</span>
          <span className={styles.walletTitle}>{currentWallet?.title}</span>
        </div>
        <div className={styles.currentMoney}>
          {new Intl.NumberFormat().format(currentWallet?.money)}đ
        </div>
      </div>
      <ChoiceWalletModal
        isOpen={isOpenChoiceWallet}
        setDisplay={setIsOpenChoiceWallet}
        onChange={onChangeCurrentWallet}
        data={wallets}
      />
      <main>
        <TransactionEmpty />
      </main>
    </Layout>
  );
};

export default Home;
