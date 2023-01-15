import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/prismadb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // validate if it is a POST
 
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
    },
  });

  try {
    const response = await assembly.post("/transcript", {
        audio_url: req.body.audioUrl
    })
    res.status(200).json(response.data.id)
  } catch(error) {
    console.log('something fucked up')
    console.error(error)
  }
}
