import Layout from "@/layouts/DashboardLayout";
import { Empty as TransactionEmpty } from "@/components/common";
import { useEffect, useState } from "react";
import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOwnedWallets } from "@/stores/wallet/action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import WalletReducerType from "@/types/reducers/WalletReducerType";
import ChoiceWalletDrawer from "@/components/ChoiceWalletDrawer";
import WalletType from "@/types/entities/WalletType";
import ActiveWallet from "@/components/ActiveWallet";
import { fetchFirstPaginateOwnedTransactions } from "@/stores/transaction/action";
import Transactions from "@/components/Transactions";
import TransactionReducerType from "@/types/reducers/TransactionReducerType";
import { fetchAllOwnedCategories } from "@/stores/category/action";

const Home = ({ user }: AuthComponentProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: wallets, active: walletActiveIndex } = useSelector(
    ({ walletReducer: wallets }: Record<string, WalletReducerType>) => wallets
  );
  const { data: transactions } = useSelector(
    ({ transactionReducer: transactions }: Record<string, TransactionReducerType>) => transactions
  );

  const [isDisplayChoiceWallet, setIsDisplayChoiceWallet] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOwnedCategories({ email: user.email }));
    dispatch(fetchAllOwnedWallets({ email: user.email }));
    dispatch(fetchFirstPaginateOwnedTransactions({ email: user.email }));
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
        {
          transactions.length === 0 ? <TransactionEmpty /> : <Transactions data={transactions} />
        }
      </main>
    </Layout>
  );
};

export default Home;
