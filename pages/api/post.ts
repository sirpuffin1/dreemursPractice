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
    console.log(req.body, 'the req body')
    const {username} = req.body
    const session = await unstable_getServerSession(req, res, authOptions)
    

  // validate if it is a POST
  if (req.method !== "PUT") {
    return res
      .status(200)
      .json({ error: "This API call only accepts PUT methods" });
  }

  // get and validate body variables

  await client.user
    .update({
      where: { id: session?.user},
      data: {
        username
      }
    })
    .then(() => {
        console.log('yo it worked')
      res.status(200).json({ msg: `Successfuly updated User: ${session?.user}`});
    })
    .catch((err: string) => {
        console.log('user could not be updated')
      res.status(400).json({ error: "Error on '/api/post': " + err });
    });
}
