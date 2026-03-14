export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  try {
    const { amount, player_id } = req.body;
    const response = await fetch("https://app.pakasir.com/api/transactioncreate/qris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "jayaabadi", // GANTI INI
        order_id: `INV${Date.now()}`,
        amount: parseInt(amount),
        api_key: "15h296upaagrqL2X3CVBDTC0Lbj5Kebm" // GANTI INI
      })
    });

    const result = await response.json();

    // Pakasir mengembalikan objek { payment: { ... } }
    if (result && result.payment) {
      return res.status(200).json(result.payment); // Kita kirim isi payment-nya saja
    } else {
      return res.status(400).json({ message: "Pakasir Error", detail: result });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
