// generateMockDisasters.js
const fs = require('fs');

const disasterTypes = [
  { type: "Earthquake", tags: ["earthquake", "emergency"] },
  { type: "Flood", tags: ["flood", "evacuation"] },
  { type: "Tornado", tags: ["tornado", "alert"] },
  { type: "Wildfire", tags: ["wildfire", "fire"] },
  { type: "Landslide", tags: ["landslide", "rescue"] },
  { type: "Explosion", tags: ["explosion", "emergency"] },
  { type: "Blackout", tags: ["blackout", "infrastructure"] },
  { type: "Bridge Collapse", tags: ["collapse", "emergency"] },
  { type: "Drought", tags: ["drought", "warning"] },
  { type: "Hurricane", tags: ["hurricane", "storm"] }
];

const locations = [
  "Tokyo, Japan",
  "Delhi, India",
  "London, UK",
  "New York, USA",
  "Rio de Janeiro, Brazil",
  "Cape Town, South Africa",
  "Moscow, Russia",
  "Sydney, Australia",
  "Toronto, Canada",
  "Berlin, Germany",
  "Tehran, Iran",
  "Jakarta, Indonesia",
  "Cairo, Egypt",
  "Seoul, South Korea",
  "Paris, France",
  "Kuala Lumpur, Malaysia",
  "Barcelona, Spain",
  "Nairobi, Kenya",
  "Bangkok, Thailand",
  "Los Angeles, USA",
  "Mexico City, Mexico",
  "Istanbul, Turkey",
  "Lagos, Nigeria",
  "Buenos Aires, Argentina",
  "Karachi, Pakistan",
  "Baghdad, Iraq",
  "Rome, Italy",
  "Madrid, Spain",
  "Athens, Greece",
  "Amsterdam, Netherlands",
  "Hanoi, Vietnam",
  "Lima, Peru",
  "Manila, Philippines",
  "Dubai, UAE",
  "Beijing, China",
  "Shanghai, China",
  "Chicago, USA",
  "San Francisco, USA",
  "Vancouver, Canada",
  "Melbourne, Australia",
  "Auckland, New Zealand",
  "Kabul, Afghanistan",
  "Riyadh, Saudi Arabia",
  "Damascus, Syria",
  "Addis Ababa, Ethiopia",
  "Kampala, Uganda",
  "Stockholm, Sweden",
  "Oslo, Norway",
  "Helsinki, Finland",
  "Warsaw, Poland",
  "Lisbon, Portugal",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "Zurich, Switzerland",
  "Copenhagen, Denmark",
  "Budapest, Hungary",
  "Brussels, Belgium",
  "Doha, Qatar",
  "Amman, Jordan",
  "Muscat, Oman",
  "Baku, Azerbaijan",
  "Tashkent, Uzbekistan",
  "Yerevan, Armenia",
  "Santiago, Chile",
  "Montevideo, Uruguay",
  "Brasília, Brazil",
  "Porto, Portugal",
  "Bangalore, India",
  "Hyderabad, India",
  "Ahmedabad, India",
  "Chennai, India",
  "Pune, India",
  "Surat, India",
  "Kanpur, India",
  "Lucknow, India",
  "Indore, India",
  "Patna, India",
  "Bhopal, India",
  "Kolkata, India",
  "Guwahati, India",
  "Shillong, India",
  "Imphal, India",
  "Thimphu, Bhutan",
  "Colombo, Sri Lanka",
  "Dhaka, Bangladesh",
  "Kathmandu, Nepal",
  "Tbilisi, Georgia",
  "Skopje, North Macedonia",
  "Belgrade, Serbia",
  "Zagreb, Croatia",
  "Sofia, Bulgaria",
  "Algiers, Algeria",
  "Tunis, Tunisia",
  "Casablanca, Morocco",
  "Minsk, Belarus",
  "Havana, Cuba",
  "San Juan, Puerto Rico",
  "Panama City, Panama",
  "San Salvador, El Salvador",
  "Guatemala City, Guatemala",
  "Reykjavik, Iceland"
];


const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const disasters = Array.from({ length: 500 }, () => {
  const disaster = getRandom(disasterTypes);
  const location = getRandom(locations);
  return {
    title: `${disaster.type} in ${location}`,
    description: `${disaster.type} reported in ${location}. Emergency services are being dispatched.`,
    tags: disaster.tags
  };
});

fs.writeFileSync('./data/mockDisasters.json', JSON.stringify(disasters, null, 2));
console.log('✅ mockDisasters.json generated with 100 entries');



// 📦 Add Reports: needs, offers, alerts
const reportTypes = {
  need: [
    "Need clean water",
    "Require urgent medical aid",
    "Searching for missing family member",
    "Need shelter immediately",
    "Need food and baby supplies"
  ],
  offer: [
    "Offering shelter for 4 people",
    "Distributing food at central park",
    "Free transport to relief camps",
    "Medical assistance available at local clinic",
    "Can help reunite families"
  ],
  alert: [
    "Flood warning issued in area",
    "Evacuation order in place",
    "Tornado approaching the coast",
    "Bridge collapse reported",
    "High risk of landslide nearby"
  ]
};

const getRandomReport = () => {
  const keys = Object.keys(reportTypes);
  const type = getRandom(keys);
  return {
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
    description: getRandom(reportTypes[type]) + getRandom(locations),
    tags: [type],
  };
};

const reports = Array.from({ length: 300 }, () => getRandomReport());

fs.writeFileSync('./data/mockReports.json', JSON.stringify(reports, null, 2));
console.log('✅ mockReports.json generated with 300 entries');
