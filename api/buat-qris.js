export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const { amount, player_id } = req.body;
    const order_id = `INV${Date.now()}`; // Membuat Order ID unik

    const response = await fetch("https://app.pakasir.com/api/transactioncreate/qris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "jayaabadi", // Ganti dengan Slug Proyek dari Pakasir
        order_id: order_id,
        amount: parseInt(amount),
        api_key: "15h296upaagrqL2X3CVBDTC0Lbj5Kebm" // Ganti dengan API Key Proyek dari Pakasir
      })
    });

    const result = await response.json();

    if (result.payment) {
      return res.status(200).json({
        status: "success",
        data: {
          qr_url: result.payment.payment_number, // Ini adalah QR String
          id: result.payment.order_id,
          total: result.payment.total_payment
        }
      });
    } else {
      return res.status(400).json({ message: "Gagal membuat transaksi", detail: result });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Koneksi", error: error.message });
  }
}
