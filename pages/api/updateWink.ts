import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {transcription, selectValue, winkId} = req.body.updatedFields

  // validate if it is a POST
  if (req.method !== "PUT") {
    return res
      .status(200)
      .json({ error: "This API call only accepts PUT methods" });
  }

  try {
    const updatedWink = await prisma.posts.update({
        where: {
            id: winkId
        },
        data: {
            transcription: transcription,
            category: selectValue
        }
    })
    return res.status(200).json(updatedWink)
  } catch(error) {
      console.log(error)
  }
  
}

  // get and validate body variables

  
