import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const user = req.body;
    const data = await client
      .createIfNotExists(user)
      .then(() => res.status(200).json({ data: 'Login successful!' }));
  }
}
