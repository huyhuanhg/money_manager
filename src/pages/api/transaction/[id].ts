// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import { updateDoc, doc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only PUT requests allowed" });
    return;
  }

  try {
    const { id: transactionId } = req.query;
    await updateDoc(doc(db, "transactions", transactionId as string), req.body);

    res.status(200).json({ message: "Update success" });
  } catch (error) {
    res.status(400).send({ message: "Update fail" });
  }
}
