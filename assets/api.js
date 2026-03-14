const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { player_id } = req.body;
  const dummy_product_id = "1"; // Sesuai kode asli Anda
  const secret_signature = "7d83ac6f236288c720d7f4f4109a0776"; // Sesuai data toko

  // Membuat MD5 Signature: player_id=xxx&product_id=1&signature=xxx
  const rawString = `player_id=${player_id}&product_id=${dummy_product_id}&signature=${secret_signature}`;
  const signature = crypto.createHash('md5').update(rawString).digest('hex');

  try {
    const apiUrl = `https://idn-ack.neopartyworld.com/agent_recharge/order/info?player_id=${player_id}&product_id=${dummy_product_id}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Signature': signature,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Gagal menyambung ke server Neoparty" });
  }
}
