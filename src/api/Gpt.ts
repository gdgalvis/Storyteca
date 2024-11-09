import axios from 'axios';

const Story = async (prompt: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log("API Key:", import.meta.env.VITE_OPENAI_API_KEY);
  return response.data.choices[0].message.content;
};

export default Story;
