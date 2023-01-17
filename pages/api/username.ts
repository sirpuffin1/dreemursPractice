import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/prismadb";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";

interface ResponseData {
  error?: string;
  msg?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const {username} = req.body
    const session = await unstable_getServerSession(req, res, authOptions)
    
  if (req.method !== "PUT") {
    return res
      .status(200)
      .json({ error: "This API call only accepts PUT methods" });
  }

  await client.user
    .update({
      where: { id: session?.user as unknown as string},
      data: {
        username
      }
    })
    .then(() => {
      return res.status(200).json({ msg: `Successfuly updated User: ${session?.user}`});
    })
    .catch((err: string) => {
      return res.status(400).json({ error: "Error on '/api/username': " + err });
    });
}
