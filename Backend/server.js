const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync(path.join(__dirname, 'uploads'))) fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
const DB_FILE = path.join(__dirname, 'data', 'db.json');

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], appointments: [], records: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE));
}
function writeDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/predict', require('./routes/predict'));
app.use('/api/records', require('./routes/records'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('peer-joined', { id: socket.id });
  });
  socket.on('signal', ({ roomId, data }) => {
    socket.to(roomId).emit('signal', data);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnect', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log('Backend running on port', PORT);
});
