import React from 'react';
import FileUploadSection from '../components/FileUploadSection';

export default function Records(){
  const sections = [
    'Bills',
    'Aadhar/ID',
    'Previous Reports',
    'Prescriptions',
    'Visit Summaries',
    'Receipts'
  ];
  return (
    <div>
      <h2 className="section-title">Upload Documents</h2>
      <div className="grid cols-3">
        {sections.map(s => <FileUploadSection key={s} section={s} patientId={'p1'} />)}
      </div>
    </div>
  );
}
