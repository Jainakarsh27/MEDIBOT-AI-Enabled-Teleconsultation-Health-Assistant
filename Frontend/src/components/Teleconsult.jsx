import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function Teleconsult(){
  const localRef = useRef(null);
  const [socket, setSocket] = useState(null);
  useEffect(()=> {
    const s = io('http://localhost:4000');
    setSocket(s);
    return ()=> s.disconnect();
  }, []);

  useEffect(()=> {
    let stream = null;
    async function start(){
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video:true, audio:true });
        if (localRef.current) localRef.current.srcObject = stream;
      } catch(e){ console.warn('camera denied', e); }
    }
    start();
    return ()=> { if (stream) stream.getTracks().forEach(t=>t.stop()); };
  }, []);

  return (
    <div className="card">
      <h3 className="section-title">Teleconsult (Local Preview)</h3>
      <video ref={localRef} autoPlay muted playsInline style={{width:'100%', borderRadius:8}} />
      <p className="small">This demo shows local preview and socket.io signalling channel is connected.</p>
      <div><small>Socket: {socket ? 'connected' : 'disconnected'}</small></div>
    </div>
  );
}
