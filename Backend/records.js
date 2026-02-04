const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');

const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB_FILE)); }
function writeDB(db){ fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + shortid.generate() + ext);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  const { patientId, section, uploaderId } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file' });
  const db = readDB();
  const rec = {
    id: shortid.generate(),
    patientId,
    uploaderId,
    section,
    fileUrl: `/uploads/${file.filename}`,
    filename: file.originalname,
    uploadedAt: new Date().toISOString()
  };
  db.records.push(rec);
  writeDB(db);
  res.json({ ok: true, record: rec });
});

router.get('/:patientId', (req, res) => {
  const db = readDB();
  const list = db.records.filter(r => r.patientId === req.params.patientId);
  res.json(list);
});

module.exports = router;
