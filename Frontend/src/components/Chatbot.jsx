import React, { useState } from 'react';
import API from '../api/client';

export default function Chatbot(){
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi — tell me your symptoms or ask me to book an appointment.' }]);
  const [input, setInput] = useState('');
  const send = async () => {
    if (!input) return;
    setMessages(m=>[...m, {from:'user', text:input}]);
    const text = input.toLowerCase();
    if (text.includes('book')) {
      setMessages(m => [...m, {from:'bot', text:'I can book an appointment. Provide date and doctor name like: "book 2025-06-01 with Dr. Himanshu"'}]);
    } else {
      const symptoms = input.split(',').map(s=>s.trim()).filter(Boolean);
      try {
        const res = await API.post('/predict', { symptoms });
        setMessages(m => [...m, {from:'bot', text: JSON.stringify(res.data[0]) }]);
      } catch (e) {
        setMessages(m => [...m, {from:'bot', text: 'Sorry, prediction failed.' }]);
      }
    }
    setInput('');
  };

  return (
    <div className="card">
      <h3 className="section-title">Chatbot & Symptom Predictor</h3>
      <div style={{minHeight:120, maxHeight:240, overflow:'auto', padding:8, border:'1px solid #eee', borderRadius:8, marginBottom:8}}>
        {messages.map((m,i)=> <div key={i} style={{marginBottom:6}}><strong>{m.from}:</strong> {m.text}</div>)}
      </div>
      <div style={{display:'flex', gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g., fever, cough" style={{flex:1,padding:8}} />
        <button onClick={send} className="button">Send</button>
      </div>
    </div>
  );
}
