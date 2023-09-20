const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');

dotenv.config();

const router = express.Router();

const apiKey = process.env.OPENAI_API_KEY;
router.use(cors());
router.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from Elier ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify(
          {
            prompt,
            n: 1,
            size: "1024x1024",
          }
        ),
      }
    );

    const data = await response.json();
    const imageUrl = data.data[0].url; 

    // You can also fetch the image from the URL
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.buffer();

    // Return the image buffer as a response
    res.setHeader('Content-Type', imageResponse.headers.get('content-type'));
    res.status(200).json({ photo: imageBuffer.toString('base64') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to AI" });
  }
});

module.exports = router;
