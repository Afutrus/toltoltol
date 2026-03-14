import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;
  // Tanya ke database: "Apakah ID ini sudah lunas?"
  const status = await kv.get(`status:${id}`);

  if (status === 'lunas') {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(200).json({ status: 'pending' });
  }
}
