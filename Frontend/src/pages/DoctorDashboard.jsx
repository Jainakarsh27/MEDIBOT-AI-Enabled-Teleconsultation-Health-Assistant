import React, { useEffect, useState } from 'react';
import API from '../api/client';

export default function DoctorDashboard(){
  const [appts, setAppts] = useState([]);
  useEffect(()=> { API.get('/appointments').then(r=>setAppts(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <div className="card">
        <h2>Doctor Dashboard (Queue)</h2>
        {appts.map(a => (
          <div key={a.id} style={{padding:8,borderBottom:'1px solid #eee'}}>
            <strong>{a.patientId}</strong> — {new Date(a.dateTime).toLocaleString()} <div style={{fontSize:12}}>{a.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
