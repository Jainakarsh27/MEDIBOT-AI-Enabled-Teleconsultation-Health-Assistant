const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB_FILE)); }
function writeDB(db){ fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

router.post('/register', (req, res) => {
  const { name, email, role='patient' } = req.body;
  const db = readDB();
  const id = 'u' + Date.now();
  const user = { id, name, email, role };
  db.users.push(user);
  writeDB(db);
  res.json({ ok: true, user });
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const token = Buffer.from(JSON.stringify({ id: user.id })).toString('base64');
  res.json({ ok: true, token, user });
});

module.exports = router;
