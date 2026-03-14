import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required" });

    // Cek apakah koneksi KV tersedia
    const status = await kv.get(`status:${id}`);

    if (status === 'completed' || status === 'lunas') {
      return res.status(200).json({ status: 'success' });
    }

    return res.status(200).json({ status: 'pending' });
  } catch (error) {
    console.error("KV Error:", error);
    // Balas dengan status 200 tapi pending agar frontend tidak crash
    return res.status(200).json({ status: 'pending', error: "Database not connected" });
  }
}
