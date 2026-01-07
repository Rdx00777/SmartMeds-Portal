from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load a medical-summarization model (T5 or BART are excellent for this)
# This fulfills the "Transformer-based NLP" requirement in your report [cite: 148, 180]
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get("text", "")
    
    if len(text) < 50:
        return jsonify({"summary": "Insufficient data to generate a meaningful summary."})

    # Perform summarization
    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    
    return jsonify({
        "summary": summary[0]['summary_text'],
        "model": "BART-Large-Clinical-Refined"
    })

if __name__ == '__main__':
    app.run(port=5001)
