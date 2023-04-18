import styles from "@/styles/Home.module.css";
import Layout from "@/layouts/DashboardLayout";
import TransactionEmpty from "@/components/TransactionEmpty";
import ChoiceWalletModal from "@/components/ChoiceWalletModal";
import { useContext, useEffect, useState } from "react";
import { db } from "@/configs/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { AuthComponentProps } from "@/types/AuthComponentProps";
import { store } from "@/stores";
import { ACTION_GET_ALL_OWNED_WALLETS } from "@/stores/constant";

const Home = ({ user }: AuthComponentProps) => {
  const { dispatch, ...state } = useContext(store);
  const [isOpenChoiceWallet, setIsOpenChoiceWallet] = useState(false);
  const [currentWallet, setCurrentWallet] = useState({
    icon: "A",
    title: "Tất cả",
    money: 0,
  });

  useEffect(() => {
    dispatch({ type: ACTION_GET_ALL_OWNED_WALLETS, payload: { user } })
  }, []);

  useEffect(() => {
    console.log('state :>> ', state);
  }, [state]);

  const q = query(collection(db, "wallets"), where("user", "==", user.email));
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
