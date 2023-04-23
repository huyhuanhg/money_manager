import { db } from "@/configs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const fetchAllOwnedWallets = createAsyncThunk(
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

export const fetchChangeBalance = createAsyncThunk(
  "wallet/change_the_balance",
  async ({ id, money }: any) => {
    await updateDoc(
      doc(db, "wallets", id),
      {
        money,
      }
    );

    return Promise.resolve({ id, money });
  }
);
