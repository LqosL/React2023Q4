import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<{ text: string }>
) {
  response.status(200).json({ text: 'vasya' });
}
