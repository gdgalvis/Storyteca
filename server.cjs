
const express = require('express');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const port = 3000;


const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});


app.use(express.json());


app.post('/api/openai', async (req, res) => {
  try {
    const { prompt } = req.body; 

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    // Return the response from OpenAI to the client
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
