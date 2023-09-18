const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (e.g., your client-side HTML)
app.use(express.static('client'));

// Define a root route ("/") that sends a response
app.get('/', (req, res) => {
  res.send('Hello, World! This is your server.');
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Simulate receiving a message
    console.log('Received a new message:', message);
    
    // Send a notification to the client
    ws.send('New message received');
  });
});

const port = process.env.PORT || 3000; // Use the provided port or 3000 by default

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
