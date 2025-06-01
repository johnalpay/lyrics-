const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/api/lyrics', async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Missing title parameter' });
  }

  try {
    const response = await axios.get(`https://betadash-api-swordslush-production.up.railway.app/lyrics-finder?title=${encodeURIComponent(title)}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});

module.exports = app;
