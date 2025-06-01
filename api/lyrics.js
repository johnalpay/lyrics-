export default async function handler(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  try {
    const response = await fetch(`https://betadash-api-swordslush-production.up.railway.app/lyrics-finder?title=${encodeURIComponent(title)}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lyrics.' });
  }
}
