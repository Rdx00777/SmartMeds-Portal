import React, { useState } from 'react';

const DoctorDashboard = () => {
    const [notes, setNotes] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/process-record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientData: notes }),
            });
            const data = await response.json();
            setSummary(data.summary);
        } catch (err) {
            console.error("Failed to fetch summary");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
            <h2>👨‍⚕️ Doctor Command Center</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3>Clinical Notes Input</h3>
                    <textarea 
                        style={{ width: '100%', height: '300px', borderRadius: '8px', padding: '10px' }}
                        placeholder="Enter symptoms, history, and lab results..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button 
                        onClick={handleSummarize}
                        style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        {loading ? "Generating..." : "Generate AI Summary"}
                    </button>
                </div>

                <div style={{ flex: 1, background: '#e9ecef', padding: '20px', borderRadius: '12px' }}>
                    <h3>✨ AI Generated Insight</h3>
                    <p style={{ lineHeight: '1.6', color: '#333' }}>
                        {summary || "Summary will appear here after processing..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
