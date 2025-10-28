const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API endpoint to generate quiz
app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { prompt, messages } = req.body;
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'HTTP-Referer': req.headers.referer || 'http://localhost:3000',
                'X-Title': 'AI Quiz Generator'
            },
            body: JSON.stringify({
                model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku',
                messages: messages,
                temperature: 0.7,
                max_tokens: 4000,
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter Error:', errorData);
            return res.status(response.status).json({ 
                error: errorData.error?.message || 'API request failed' 
            });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Quiz server running on http://localhost:${PORT}`);
    console.log('API Key loaded:', process.env.OPENROUTER_API_KEY ? 'Yes' : 'No');
});
