// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import Transaction, { TransactionBase } from "@/types/entities/TransactionType";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as fquery,
  where,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  transactions: Transaction[];
};

export default async function handler(
  { query }: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const q = fquery(
    collection(db, "transactions"),
    where("user", "==", query.email),
    orderBy("datetime", "desc"),
    limit(100)
  );

  const querySnapshot = await getDocs(q);

  const transactions = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...(doc.data() as TransactionBase),
    };
  });
  res.status(200).json({ transactions });
}
