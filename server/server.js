const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection based on your schema 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smartmeds',
  password: 'yourpassword',
  port: 5432,
});

app.post('/api/records/add', async (req, res) => {
  const { symptoms, patient_id } = req.body;
  
  try {
    // 1. Get Summary from Python AI Service [cite: 179]
    const aiRes = await axios.post('http://localhost:5001/summarize', { text: symptoms });
    const summary = aiRes.data.summary;

    // 2. Save to PostgreSQL [cite: 175]
    const newRecord = await pool.query(
      "INSERT INTO medical_records (patient_id, symptoms, diagnosis) VALUES ($1, $2, $3) RETURNING *",
      [patient_id, symptoms, summary]
    );

    res.json({ record: newRecord.rows[0], ai_summary: summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Backend running on port 5000'));
