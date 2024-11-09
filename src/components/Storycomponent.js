import React, { useState } from 'react';
import Story from './API/GPT';

const ChatComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gptResponse = await Story(prompt);
    setResponse(gptResponse);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>GPT Response: {response}</p>}
    </div>
  );
};

export default ChatComponent;