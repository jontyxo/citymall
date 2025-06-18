const axios = require('axios');
const fs = require('fs');

const mockDisasters = JSON.parse(fs.readFileSync('./data/mockDisasters.json', 'utf-8'));

const postMockDisaster = async () => {
  const randomDisaster = mockDisasters[Math.floor(Math.random() * mockDisasters.length)];
  console.log('🚨 Posting random mock disaster...');

  try {
    const response = await axios.post('http://localhost:432/api/disasters', randomDisaster);
    console.log('✅ Posted:', response.data[0].title);
  } catch (error) {
    console.error('❌ Error posting:', error.message);
  }
};

module.exports = () => {
  postMockDisaster(); // first call immediately
  setInterval(postMockDisaster, 5 * 60 * 1000); // every 5 minutes
};
