import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
    },
  });

  console.log(req.body)
  console.log(req.body.transcriptId)

  try {
    const response = await assembly.get(`/transcript/${req.body.transcriptId}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.log("something fucked up with getting ");
    console.error(error);
  }
}
