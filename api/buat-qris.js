// api/buat-qris.js
export default async function handler(req, res) {
  const { amount, player_id } = req.body;
  
  const response = await fetch("https://pakasir.com/api/v1/create-transaction", {
    method: "POST",
    headers: {
      "Authorization": "Bearer API_KEY_PAKASIR_ANDA",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: amount,
      reference: player_id,
      callback_url: "https://jayaabadi.namadomainmu.com/api/webhook" // URL Tunnel Anda
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
