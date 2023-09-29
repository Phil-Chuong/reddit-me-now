const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000; // Use the port of your choice

// Add CORS headers to allow requests from your frontend (http://localhost:3000)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define a route to proxy requests to the Reddit API
app.get('/reddit/:subreddit', async (req, res) => {
  try {
    const { subreddit } = req.params;
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});

