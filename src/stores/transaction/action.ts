import { db } from "@/configs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";

export const fetchStoreTransaction = createAsyncThunk(
  "transaction/store_transaction",
  async ({ data, email }: any) => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...data,
        money: -1 * data.money,
        type: "transactions",
        user: email,
      });
    } catch (error) {
      console.error("ERROR SET TRANSACTION IN DB", error);
      return Promise.reject("ERROR SET TRANSACTION IN DB");
    }

    return Promise.resolve({ walletId: data.wallet, balance: -1 * data.money });
  }
);

export const fetchFirstPaginateOwnedTransactions = createAsyncThunk(
  "transaction/first_paginate_owned",
  async ({ email }: any) => {
    try {
      const q = query(
        collection(db, "transactions"),
        where("user", "==", email),
        orderBy("datetime", "desc"),
        limit(100)
      );

      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return Promise.resolve({ transactions });
    } catch (e) {
      return Promise.reject();
    }
  }
);

export const fetchPaginateOwnedTransactions = createAsyncThunk(
  "transaction/paginate_owned",
  async ({ email, after }: any) => {
    try {
      const startAfterSnap = await getDoc(doc(db, "transactions", after));

      const q = query(
        collection(db, "transactions"),
        where("user", "==", email),
        orderBy("datetime", "desc"),
        startAfter(startAfterSnap),
        limit(100)
      );

      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return Promise.resolve({ transactions });
    } catch (e) {
      return Promise.reject();
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transaction/get_by_id",
  async ({ id }: any) => {
    try {
      const transaction = await getDoc(doc(db, "transactions", id));

      return Promise.resolve({
        transaction: {
          id: transaction.id,
          ...transaction.data(),
        },
      });
    } catch (e) {
      return Promise.reject();
    }
  }
);
