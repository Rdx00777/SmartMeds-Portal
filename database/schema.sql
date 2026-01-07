-- 1. Users Table (Doctors, Patients, Admins) [cite: 566]
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('PATIENT', 'DOCTOR', 'ADMIN')), [cite: 572]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patients Table (Detailed profiles) [cite: 226, 577]
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    full_name VARCHAR(100) NOT NULL,
    dob DATE,
    blood_type VARCHAR(5),
    allergies TEXT,
    chronic_conditions TEXT
);

-- 3. Medical Records Table [cite: 228, 585]
CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    doctor_id INTEGER REFERENCES users(user_id),
    visit_date DATE DEFAULT CURRENT_DATE,
    symptoms TEXT,
    diagnosis TEXT,
    medications TEXT,
    lab_results TEXT,
    attachment_url TEXT -- Link to S3/Firebase storage [cite: 228]
);

-- 4. AI Summaries Table [cite: 181]
CREATE TABLE ai_summaries (
    summary_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    summary_text TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    model_version VARCHAR(50) -- Tracking BERT/GPT version [cite: 181]
);

-- 5. Audit Logs Table (For HIPAA/GDPR Compliance) [cite: 96, 151, 307]
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    action VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) [cite: 176]
);
