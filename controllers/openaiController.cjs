const openai = require('../config/openaiConfig.cjs');

const generateMeta = async (title) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Escribe una historia con los siguientes parametros : "${title}"` }],
    max_tokens: 100,
  });

  console.log(response.choices[0].message.content);
};

module.exports = { generateMeta };

