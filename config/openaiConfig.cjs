require('dotenv').config({ path: './key.env' });


const { OpenAI } = require('openai');


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
  //
});

module.exports = openai;



