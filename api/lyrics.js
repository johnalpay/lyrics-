const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Lyrics Finder by Sxe Ci',
    usage: '/api/lyrics?artist=Ed Sheeran&title=Perfect'
  });
});

app.get('/api/lyrics', async (req, res) => {
  const { artist, title } = req.query;
  if (!artist || !title) {
    return res.status(400).json({ error: 'Missing artist or title' });
  }

  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (response.data && response.data.lyrics) {
      res.json({ artist, title, lyrics: response.data.lyrics });
    } else {
      res.status(404).json({ error: 'Lyrics not found' });
    }
  } catch {
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});

app.get('/api/suggest', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=10`);
    const suggestions = response.data.results.map(song => ({
      artist: song.artistName,
      title: song.trackName
    }));
    res.json(suggestions);
  } catch {
    res.status(500).json({ error: 'Suggestion fetch failed' });
  }
});

app.listen(PORT, () => console.log(`Lyrics Finder API running on port ${PORT}`));
