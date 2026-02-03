import React, { useEffect, useState } from 'react';
import API from '../api/client';
import AppointmentWizard from '../components/AppointmentWizard';

export default function PatientDashboard(){
  const [appts, setAppts] = useState([]);
  useEffect(()=> { API.get('/appointments').then(r=>setAppts(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <div className="card">
        <h2>Patient Dashboard</h2>
        <p>Upcoming Appointments</p>
        {appts.length===0 ? <p>No appointments</p> : appts.map(a=><div key={a.id} style={{padding:8,borderBottom:'1px solid #eee'}}>{a.dateTime} — {a.status}</div>)}
      </div>

      <AppointmentWizard />
    </div>
  );
}
