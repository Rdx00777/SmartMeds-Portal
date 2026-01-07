CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    role VARCHAR(20) -- DOCTOR or PATIENT [cite: 147]
);

CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id INTEGER,
    visit_date DATE DEFAULT CURRENT_DATE,
    symptoms TEXT,
    diagnosis TEXT -- This stores the AI summary [cite: 175]
);
