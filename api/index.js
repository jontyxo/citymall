const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
require('dotenv').config();

const app = express();
const server = http.createServer(app); 
const wss = new WebSocketServer({ server }); 

const PORT = process.env.PORT || 432;


wss.on('connection', (ws) => {
  console.log('📡 New WebSocket client connected');
});


require('./cron/fakeSocialReport')(wss);

app.use(cors());
app.use(express.json());


const disasterRoutes = require('./routes/disasterRoutes');
app.use('/api/disasters', disasterRoutes);


app.get('/', (req, res) => {
  res.send('Server is working!');
});


server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
