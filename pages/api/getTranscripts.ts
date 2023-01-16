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

  try {
    const response = await assembly.get(`/transcript/${req.body.transcriptId}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return console.error(error);
  }
}
