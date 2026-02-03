import React, { useState } from 'react';
import API from '../api/client';

export default function FileUploadSection({ section, patientId }) {
  const [files, setFiles] = useState([]);
  const onChange = (e) => setFiles(Array.from(e.target.files || []));
  const upload = async () => {
    if (files.length === 0) return alert('Choose files');
    const fd = new FormData();
    fd.append('file', files[0]);
    fd.append('patientId', patientId || 'p1');
    fd.append('section', section);
    fd.append('uploaderId', 'lab1');
    try {
      const res = await API.post('/records/upload', fd, { headers: {'Content-Type':'multipart/form-data'} });
      alert('Uploaded: ' + res.data.record.filename);
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    }
  };
  return (
    <div className="card">
      <h4>{section}</h4>
      <input type="file" onChange={onChange} />
      <div style={{marginTop:8}}><button className="button" onClick={upload}>Upload</button></div>
    </div>
  );
}
