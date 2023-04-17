import styles from "@/styles/Home.module.css";
import Layout from "@/layouts/Layout";
import TransactionEmpty from "@/components/TransactionEmpty";
import ChoiceWalletModal from "@/components/ChoiceWalletModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { database } from '@/firebase.config'
// import Loading from "@/components/Loading";

const Home = () => {
  const { data: session } = useSession()

  useEffect(() => {
    // test
    console.log('database :>> ', database );
  }, [])

  const [isOpenChoiceWallet, setIsOpenChoiceWallet] = useState(false)
  const [currentWallet, setCurrentWallet] = useState({
    icon: 'A',
    title: 'Tất cả',
    money: 10000,
  })

  const showChoiceWalletModal = () => {
    setIsOpenChoiceWallet(true)
  }

  const onChangeCurrentWallet = (data: any) => {
    setCurrentWallet(data)
    setIsOpenChoiceWallet(false)
  }

  return (
    <Layout>
      <div className={styles.currentWallet} onClick={showChoiceWalletModal}>
        <div className={styles.walletInfo}>
          <span className={styles.walletIcon}>{currentWallet.icon}</span>
          <span className={styles.walletTitle}>{currentWallet.title}</span>
        </div>
        <div className={styles.currentMoney}>{new Intl.NumberFormat().format(currentWallet.money)}đ</div>
      </div>
      <ChoiceWalletModal isOpen={isOpenChoiceWallet} setDisplay={setIsOpenChoiceWallet} onChange={onChangeCurrentWallet}/>
      <main>
        <TransactionEmpty />
      </main>
    </Layout>
  );
};

export default Home;
