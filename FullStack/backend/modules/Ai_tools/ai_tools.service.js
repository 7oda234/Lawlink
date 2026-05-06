const axios = require('axios');

// Assuming your Python service runs on port 8000 locally
const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

exports.conductResearch = async (req, res, next) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ 
                success: false, 
                message: 'A research query is required.' 
            });
        }

        // Forward the request to the Python microservice
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/research`, {
            query: query
        });

        // Send the AI response back to the React frontend
        res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('AI Research Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing the research request.',
            error: error.response ? error.response.data : error.message
        });
    }
};
