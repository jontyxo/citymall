const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY;

async function extractLocationFromDescription(description) {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: `Extract the city or place name from this text: "${description}". Only return the location name, nothing else.`,
            },
          ],
        },
      ],
    });

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text?.trim() || 'Unknown';
  } catch (err) {
    console.error('Gemini API Error:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { extractLocationFromDescription };
