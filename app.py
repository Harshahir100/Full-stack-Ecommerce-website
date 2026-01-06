from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app)

# Basic route
@app.route('/')
def home():
    return {'message': 'API is running...'}, 200

# Health check route
@app.route('/health')
def health():
    return {'status': 'healthy'}, 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

