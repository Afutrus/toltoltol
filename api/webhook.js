export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const data = req.body;
  if (data.status === 'completed') {
    const BOT_TOKEN = "8597331224:AAFnZ8fuiYeyUKVlypItH1Gutz23PCOMT6Y";
    const CHAT_ID = "6604182176";
    const pesan = `✅ *PEMBAYARAN QRIS PAKASIR SUKSES*%0A💰 Nominal: Rp ${data.amount.toLocaleString()}%0A🆔 Order ID: ${data.order_id}%0A👤 Player ID: ${data.reference || 'N/A'}`;
    
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${pesan}&parse_mode=Markdown`);
  }
  res.status(200).send('OK');
}
