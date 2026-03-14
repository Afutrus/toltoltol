export default async function handler(req, res) {
  // Pakasir biasanya mengirimkan data via POST
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const data = req.body;
  console.log("📩 Webhook diterima dari Pakasir:", data);

  // LOGIKA: Jika status pembayaran sukses (sesuaikan dengan dokumentasi Pakasir)
  // Contoh: if (data.status === 'success') { ... kirim telegram & isi saldo ... }

  const BOT_TOKEN = "8597331224:AAFnZ8fuiYeyUKVlypItH1Gutz23PCOMT6Y";
  const CHAT_ID = "6604182176";
  const pesan = `✅ *PEMBAYARAN QRIS SUKSES*\n\n` +
                `💰 Nominal: ${data.amount}\n` +
                `🆔 Order ID: ${data.order_id}\n` +
                `📱 Player ID: ${data.player_id}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: pesan, parse_mode: 'Markdown' })
  });

  // Berikan respon 200 agar Pakasir tahu webhook berhasil diterima
  res.status(200).send('OK');
}
