import React, { useEffect, useState } from 'react';
import API from '../api/client';

export default function Appointments(){
  const [appts, setAppts] = useState([]);
  useEffect(()=> { API.get('/appointments').then(r=>setAppts(r.data)).catch(()=>{}); }, []);
  const cancel = async (id) => {
    await API.put('/appointments/' + id, { status: 'cancelled' });
    setAppts(a=>a.map(x=>x.id===id?{...x,status:'cancelled'}:x));
  };
  return (
    <div>
      <div className="card">
        <h2>Appointments</h2>
        {appts.map(a=>(
          <div key={a.id} style={{display:'flex', justifyContent:'space-between', padding:8, borderBottom:'1px solid #eee'}}>
            <div>{new Date(a.dateTime).toLocaleString()} <div style={{fontSize:12,color:'#666'}}>{a.notes}</div></div>
            <div>
              <button className="button small" onClick={()=>cancel(a.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
