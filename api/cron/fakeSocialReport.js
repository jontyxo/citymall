const axios = require('axios');
const fs = require('fs');

const mockDisasters = JSON.parse(fs.readFileSync('./data/mockReports.json', 'utf-8'));
let postCount = 0;

module.exports = function (wss) {
  const postMockDisaster = async () => {
    postCount++;

    const randomDisaster = { ...mockDisasters[Math.floor(Math.random() * mockDisasters.length)] };

    if (postCount % 2 === 0 && !randomDisaster.tags.includes('urgent')) {
      randomDisaster.tags.push('urgent');
    }

    console.log('🚨 Posting mock report:', randomDisaster.title, '| Tags:', randomDisaster.tags);

    try {
      const STATIC_CREATOR = 'e9fb6d76-5f4b-46a5-adf2-454bd0e73605';
      randomDisaster.created_by = STATIC_CREATOR;
      const response = await axios.post('https://citymall-sldm.onrender.com/api/disasters', randomDisaster);
      const posted = response.data[0];

      console.log('✅ Posted:', posted.title);

      // 🔄 Broadcast to all WebSocket clients
      if (wss && wss.clients) {
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({ type: 'new_social', data: posted }));
          }
        });
      }

    } catch (error) {
      console.error('❌ Error posting:', error.message);
    }
  };

  postMockDisaster(); // run immediately
  setInterval(postMockDisaster, 5 * 60 * 1000); // every 5 minutes
};
