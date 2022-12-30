import { postDetailQuery } from './../../../utils/queries';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../../utils/client';
import { Video } from '../../../types';

type Data = {
  data: Video;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);
    res.status(200).json({ data: data[0] });
  }
}
