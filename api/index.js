const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // 👈 HTTP server for WebSocket support
const wss = new WebSocketServer({ server }); // 👈 Create WebSocket server

const PORT = process.env.PORT || 432;

// ✅ WebSocket connection log
wss.on('connection', (ws) => {
  console.log('📡 New WebSocket client connected');
});

// 🟢 START the fake social cron (pass WebSocket)
require('./cron/fakeSocialReport')(wss); // ✅ Pass WebSocket instance

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const disasterRoutes = require('./routes/disasterRoutes');
app.use('/api/disasters', disasterRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Start HTTP server (not app.listen anymore!)
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
