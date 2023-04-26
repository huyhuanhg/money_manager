// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import { addDoc, collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only PUT requests allowed" });
    return;
  }

  try {

    const doc = await addDoc(collection(db, "wallets"), req.body)

    res.status(200).json({ message: "Create success" });
  } catch (error) {
    res.status(400).send({ message: "Create fail" });
  }
}
