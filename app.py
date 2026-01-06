from flask import Flask, send_from_directory, send_file
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Path to frontend build directory
FRONTEND_DIST = os.path.join(os.path.dirname(__file__), 'frontend', 'dist')

# Create Flask app
app = Flask(__name__)
CORS(app)

# API routes
@app.route('/api/health')
def health():
    return {'status': 'healthy'}, 200

# Serve static files from the frontend dist folder
@app.route('/<path:path>')
def serve_frontend(path):
    # Don't serve frontend for API routes
    if path.startswith('api/'):
        return {'error': 'API endpoint not found'}, 404
    
    # Check if dist folder exists
    if not os.path.exists(FRONTEND_DIST):
        return {
            'error': 'Frontend not built',
            'message': 'Please build the frontend first by running: cd frontend && npm run build'
        }, 404
    
    # Check if the requested file exists in the dist folder
    file_path = os.path.join(FRONTEND_DIST, path)
    if path and os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(FRONTEND_DIST, path)
    
    # For all other routes (including root), serve index.html
    # This allows React Router to handle client-side routing
    index_path = os.path.join(FRONTEND_DIST, 'index.html')
    if os.path.exists(index_path):
        return send_file(index_path)
    
    return {'error': 'Frontend files not found'}, 404

# Root route
@app.route('/')
def index():
    return serve_frontend('')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

