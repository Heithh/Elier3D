const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  organization: process.env.ORG_ID,
  apiKey: process.env.OPENAI_API_KEY
});

router.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from Elier ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: 'b64_json'
    });

    const image = response.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connection to AI" });
  }
});

module.exports = router;
