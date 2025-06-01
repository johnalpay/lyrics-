const axios = require('axios');

module.exports = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: 'Missing title' });
  }

  try {
    const response = await axios.get(
      `https://betadash-api-swordslush-production.up.railway.app/lyrics-finder?title=${encodeURIComponent(title)}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Lyrics not found or API error' });
  }
};
