const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to process records and get AI summary
app.post('/api/process-record', async (req, res) => {
    const { patientData } = req.body;

    try {
        // 1. Communicate with the AI Flask Microservice [cite: 179, 361]
        const aiResponse = await axios.post('http://localhost:5001/summarize', {
            text: patientData
        });

        // 2. Here you would normally save to PostgreSQL as per your schema [cite: 175, 250]
        // For the demo, we return the processed result
        res.json({
            status: "Success",
            summary: aiResponse.data.summary,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: "AI Service Unavailable" });
    }
});

app.listen(5000, () => console.log('Backend running on port 5000'));
