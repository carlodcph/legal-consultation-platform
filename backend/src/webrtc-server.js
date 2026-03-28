const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected");

  clients.push(ws);

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // broadcast to other clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
    console.log("Client disconnected");
  });
});

console.log("WebSocket signaling server running on ws://localhost:8080");