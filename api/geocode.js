const axios = require('axios');

async function geocodeLocation(locationName) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: locationName,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'disaster-response-app' // required by Nominatim
      }
    });

    const data = response.data[0];

    if (!data) return null;

    return {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lon)
    };
  } catch (err) {
    console.error('Geocoding Error:', err.message);
    return null;
  }
}

module.exports = { geocodeLocation };
