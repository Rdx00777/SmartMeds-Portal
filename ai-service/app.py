from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Transformer model for Clinical Summarization [cite: 180]
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def summarize():
    input_text = request.json.get('text')
    # AI logic to reduce review time [cite: 93]
    summary = summarizer(input_text, max_length=130, min_length=30, do_sample=False)
    return jsonify({"summary": summary[0]['summary_text']})

if __name__ == '__main__':
    app.run(port=5001)
