const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// API route to handle lyrics search
app.get('/api/lyrics', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({
            status: false,
            error: "Missing q parameter!",
            author: "Deku"
        });
    }

    try {
        const response = await axios.get(`https://api.zetsu.xyz/search/lyrics?q=${encodeURIComponent(query)}`);
        res.json(response.data);
    } catch (err) {
        console.error('API error:', err.message);
        res.status(500).json({
            status: false,
            error: 'Failed to fetch lyrics from Zetsu API',
            details: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
