import { db } from "@/configs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchAllOwnedWallet = createAsyncThunk(
  "wallet/all_owned",
  async ({ email }: any) => {
    const q = query(collection(db, "wallets"), where("user", "==", email));
    const querySnapshot = await getDocs(q);

    const wallets = querySnapshot.docs.map((doc) => {
      const { money, icon, title } = doc.data();
      return {
        id: doc.id,
        money,
        icon,
        title,
      };
    });
    return Promise.resolve({ wallets });
  }
);
