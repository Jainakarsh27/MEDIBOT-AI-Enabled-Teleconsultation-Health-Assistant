import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <div className="card" style={{display:'flex', gap:20, alignItems:'center'}}>
        <img src="/public/robot.png" alt="doctor" style={{width:120}} onError={()=>{}}/>
        <div>
          <h1 style={{margin:0}}>Hello, welcome to MediBot</h1>
          <p>Your health ally — teleconsult, booking, reminders & records in one place.</p>
          <div style={{marginTop:8}}>
            <Link to="/chatbot" className="button">Chatbot</Link>
            <Link to="/appointments" style={{marginLeft:8}} className="button">Book</Link>
          </div>
        </div>
      </div>

      <div className="grid cols-3" style={{marginTop:18}}>
        <div className="card"><h3>Teleconsult</h3><p>Video + chat</p></div>
        <div className="card"><h3>Symptom Checker</h3><p>Predict conditions</p></div>
        <div className="card"><h3>Records</h3><p>Upload bills & reports</p></div>
      </div>
    </div>
  );
}
