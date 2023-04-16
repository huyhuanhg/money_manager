import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

const middleware = (req: any) => {
  console.log('req :>> ', req);
  // const { url } = req
  // console.log('url :>> ', url);
  console.log('process.env.GOOGLE_ID :>> ', process.env.GOOGLE_ID);
  console.log('process.env.GOOGLE_SECRET :>> ', process.env.GOOGLE_SECRET);

  return NextResponse.next()
}

export default middleware
