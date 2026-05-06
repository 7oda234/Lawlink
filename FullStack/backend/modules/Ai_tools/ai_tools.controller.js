import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

const buildErrorPayload = (error) => {
    if (error.response) return error.response.data;
    if (error.request) return { message: 'No response received from Python AI microservice.' };
    return { message: error.message };
};

export const conductResearch = async (req, res, next) => {
    try {
        const { query } = req.body;

        if (!query || typeof query !== 'string' || !query.trim()) {
            return res.status(400).json({ 
                success: false, 
                message: 'A valid research query is required.' 
            });
        }

        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/research`, {
            query: query.trim()
        });

        return res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('AI Research Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing the research request.',
            error: buildErrorPayload(error)
        });
    }
};

export const contractReview = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'A PDF file is required for contract review.'
            });
        }

        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path), file.originalname);

        const response = await axios.post(
            `${PYTHON_AI_SERVICE_URL}/api/ai/contract-review`,
            formData,
            {
                headers: formData.getHeaders(),
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            }
        );

        fs.unlink(file.path, () => {});

        return res.status(200).json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('AI Contract Review Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing the contract review.',
            error: buildErrorPayload(error)
        });
    }
};
