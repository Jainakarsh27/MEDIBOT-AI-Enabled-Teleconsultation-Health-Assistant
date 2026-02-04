const express = require('express');
const router = express.Router();

const rules = [
  { keywords: ['fever','cough','sore throat'], condition: 'Common Cold', advice: 'Rest, hydration, paracetamol if fever', confidence: 0.82 },
  { keywords: ['headache','nausea','sensitivity'], condition: 'Migraine', advice: 'Rest in dark room, analgesic', confidence: 0.7 },
  { keywords: ['rash','itch','itching'], condition: 'Allergy', advice: 'Antihistamine, avoid triggers', confidence: 0.68 }
];

router.post('/', (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || !Array.isArray(symptoms)) return res.status(400).json({ error: 'Provide symptoms array' });

  const s = symptoms.join(' ').toLowerCase();
  const results = rules.map(r => {
    const matches = r.keywords.filter(k => s.includes(k)).length;
    const conf = Math.min(0.95, r.confidence + matches * 0.08);
    return { condition: r.condition, confidence: conf, advice: r.advice };
  }).sort((a,b)=>b.confidence-a.confidence);

  if (results.every(r => r.confidence < 0.3)) {
    results.unshift({ condition: 'General Viral Infection', confidence: 0.35, advice: 'Hydration, rest; seek doctor if symptoms worsen' });
  }
  res.json(results);
});

module.exports = router;
