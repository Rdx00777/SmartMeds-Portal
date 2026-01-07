import React, { useState } from 'react';

const DoctorDashboard = () => {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);

  const handleProcess = async () => {
    const response = await fetch('http://localhost:5000/api/records/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: notes, patient_id: 1 })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <h1>👨‍⚕️ Doctor Dashboard</h1>
      <textarea 
        placeholder="Enter patient symptoms and history..." 
        style={{ width: '100%', height: '200px' }}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleProcess} style={{ marginTop: '10px' }}>Process with AI</button>
      
      {result && (
        <div style={{ marginTop: '20px', background: '#f0f4f8', padding: '15px' }}>
          <h3>AI Summary Insight:</h3>
          <p>{result.ai_summary}</p>
        </div>
      )}
    </div>
  );
};
export default DoctorDashboard;
