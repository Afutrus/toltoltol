import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const data = req.body;
  
  if (data.status === 'completed') {
    // 1. Simpan status lunas ke database Vercel KV selama 1 jam
    await kv.set(`status:${data.order_id}`, 'lunas', { ex: 3600 });

    // 2. Kirim Notif Telegram
    const BOT_TOKEN = "8597331224:AAFnZ8fuiYeyUKVlypItH1Gutz23PCOMT6Y";
    const CHAT_ID = "6604182176";
    const pesan = `✅ *TOPUP SUKSES*%0A🆔 INV: ${data.order_id}%0A💰 Nominal: Rp ${data.amount}`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${pesan}&parse_mode=Markdown`);
  }
  
  res.status(200).send('OK');
}
