import openai from '../config/openaiConfig.mjs';  

const generateMeta = async (title) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `${title}` }],
    max_tokens: 100,
  });

  console.log(response.choices[0].message.content);
};

export default { generateMeta };

