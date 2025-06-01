import axios from 'axios';

export default async function handler(req, res) {
  const { artist, title } = req.query;

  if (!artist || !title) {
    return res.status(400).json({ error: 'Missing artist or title', author: 'Sxe Ci' });
  }

  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (response.data && response.data.lyrics) {
      return res.status(200).json({
        artist,
        title,
        lyrics: response.data.lyrics,
        author: 'Sxe Ci'
      });
    } else {
      return res.status(404).json({ error: 'Lyrics not found', author: 'Sxe Ci' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', author: 'Sxe Ci' });
  }
}
