const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB_FILE)); }
function writeDB(db){ fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.appointments || []);
});

router.post('/', (req, res) => {
  const { patientId, doctorId, dateTime, notes } = req.body;
  const db = readDB();
  const appt = { id: shortid.generate(), patientId, doctorId, dateTime, status: 'pending', notes, createdAt: new Date().toISOString() };
  db.appointments.push(appt);
  writeDB(db);
  res.json({ ok: true, appt });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const appt = db.appointments.find(a => a.id === id);
  if (!appt) return res.status(404).json({ error: 'Not found' });
  Object.assign(appt, req.body);
  writeDB(db);
  res.json({ ok: true, appt });
});

module.exports = router;
