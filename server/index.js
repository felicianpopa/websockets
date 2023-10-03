const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

const clients = new Set();

// Broadcast a message to all connected clients
function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on("connection", (ws) => {
  console.warn("connected");

  clients.add(ws);

  ws.on("message", (data) => {
    broadcast(`${data}`.toUpperCase());
  });

  ws.on("close", () => {
    console.warn("disconnected");
  });
});
