const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { artist, title } = req.query;

  if (!artist || !title) {
    return res.status(400).json({ error: 'Missing artist or title' });
  }

  try {
    const response = await fetch(`https://lyrics-api-wh91.onrender.com/api/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
