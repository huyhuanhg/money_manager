import styles from "@/styles/Home.module.css";
import Layout from "@/layouts/DashboardLayout";
import TransactionEmpty from "@/components/TransactionEmpty";
import ChoiceWalletModal from "@/components/ChoiceWalletModal";
import { useEffect, useState } from "react";
import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOwnedWallet } from "@/stores/wallet/action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import WalletReducerType from "@/types/reducers/WalletReducerType";

const Home = ({ user }: AuthComponentProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { data: wallets, active: walletActiveIndex } = useSelector(({ walletReducer: wallets }: Record<string, WalletReducerType>) => wallets)
  const [isOpenChoiceWallet, setIsOpenChoiceWallet] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOwnedWallet({ email: user.email }))
  }, []);

  const showChoiceWalletModal = () => {
    setIsOpenChoiceWallet(true);
  };

  const onChangeCurrentWallet = ({index}: Record<'index', number>) => {
    dispatch({ type: 'wallet/changeActive', payload: {index}})
    setIsOpenChoiceWallet(false);
  };

  return (
    <Layout>
      <div className={styles.currentWallet} onClick={showChoiceWalletModal}>
        <div className={styles.walletInfo}>
          <span className={styles.walletIcon}>{wallets[walletActiveIndex]?.icon}</span>
          <span className={styles.walletTitle}>{wallets[walletActiveIndex]?.title}</span>
        </div>
        <div className={styles.currentMoney}>
          {new Intl.NumberFormat().format(wallets[walletActiveIndex]?.money)}đ
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
