import axios from "axios";

export default async function handler(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Missing title parameter" });
  }

  try {
    const response = await axios.get(
      `https://betadash-api-swordslush-production.up.railway.app/lyrics-finder?title=${encodeURIComponent(title)}`
    );

    // Just forward the API response as is
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lyrics" });
  }
}
