import React, { useState } from 'react';
import API from '../api/client';

export default function AppointmentWizard(){
  const [doctor, setDoctor] = useState('d1');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const book = async () => {
    if (!date || !time) return alert('Pick date/time');
    const dt = new Date(date + 'T' + time + ':00Z').toISOString();
    try {
      const res = await API.post('/appointments', { patientId: 'p1', doctorId: doctor, dateTime: dt, notes: 'Booked via UI' });
      alert('Booked: ' + res.data.appt.id);
    } catch (e) {
      alert('Booking failed');
    }
  };
  return (
    <div className="card">
      <h3 className="section-title">Book Appointment</h3>
      <div style={{display:'flex', gap:8}}>
        <select value={doctor} onChange={e=>setDoctor(e.target.value)}><option value="d1">Dr. Himanshu</option></select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
        <button className="button" onClick={book}>Book</button>
      </div>
    </div>
  );
}
