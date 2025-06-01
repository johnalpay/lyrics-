const axios = require('axios');

module.exports = async (req, res) => {
  const { artist, title, search } = req.query;

  if (search) {
    try {
      const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(search)}&entity=song&limit=10`);
      const results = response.data.results.map(song => ({
        artist: song.artistName,
        title: song.trackName
      }));
      return res.json({ results });
    } catch (e) {
      return res.status(500).json({ error: "Suggestion fetch error." });
    }
  }

  if (!artist || !title) {
    return res.status(400).json({ error: "Missing artist or title" });
  }

  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    return res.json({
      artist,
      title,
      lyrics: response.data.lyrics
    });
  } catch (error) {
    return res.status(500).json({ error: "Lyrics not found" });
  }
};
