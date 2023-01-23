import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {transcription, audioUrl, userId} = req.body.createWinkFields
    
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  try {
    const newWink = await client.posts.create({
      data: {
        transcription: transcription,
        audioUrl: audioUrl,
        authorId: userId
      }
    })
    return res.status(200).json(newWink.id)
  } catch(error) {
      return res.status(500).json(error)
  }
  
}

  // get and validate body variables

  
