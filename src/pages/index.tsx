import Layout from "@/layouts/DashboardLayout";
import { Empty as TransactionEmpty } from "@/components/common";
import { useEffect, useState } from "react";
import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOwnedWallet } from "@/stores/wallet/action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import WalletReducerType from "@/types/reducers/WalletReducerType";
import ChoiceWalletDrawer from "@/components/ChoiceWalletDrawer";
import WalletType from "@/types/entities/WalletType";
import ActiveWallet from "@/components/ActiveWallet";

const Home = ({ user }: AuthComponentProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: wallets, active: walletActiveIndex } = useSelector(
    ({ walletReducer: wallets }: Record<string, WalletReducerType>) => wallets
  );
  const [isDisplayChoiceWallet, setIsDisplayChoiceWallet] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOwnedWallet({ email: user.email }));
  }, []);

  const displayChoiceWalletDrawer = () => {
    setIsDisplayChoiceWallet(true);
  };

  const onChangeCurrentWallet = (_wallet: WalletType, index: number) => {
    dispatch({ type: "wallet/changeActive", payload: { index } });
    setIsDisplayChoiceWallet(false);
  };

  return (
    <Layout>
      <ActiveWallet
        wallet={wallets[walletActiveIndex]}
        onClick={displayChoiceWalletDrawer}
      />
      <ChoiceWalletDrawer
        isOpen={isDisplayChoiceWallet}
        setDisplay={setIsDisplayChoiceWallet}
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
