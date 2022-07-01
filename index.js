const app = require('express')();
const cors = require('cors')
app.use(cors);
const fs = require('fs');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const Redis   = require('ioredis');
const redis  = new Redis({
  port: 6379,
  host: "redis",
});
const PORT = 6001;

const channels = {
  NOTIFICATIONS: "notifications",
  NOTIFICATION_CREATED: "notification.created",
  NOTIFICATION_READ: "notification.read",
}

redis.subscribe(
    channels.NOTIFICATION_CREATED,
    channels.NOTIFICATION_READ,
    channels.NOTIFICATIONS,
    (err, count) => {
  if (err)
    console.error("Failed to subscribe: %s", err.message);
  else
    console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    );
});


redis.on("message", (channel, message) => {
  console.log("on message - channel: ", channel);
  console.log("on message - message: ", message);
});


io.on("connection", (socket) => {
  console.log("A new connection established ...")
})

io.on("SEND_JOIN_REQUEST", (message) => {
  console.log("SEND_JOIN_REQUEST ", message)
})

server.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});

