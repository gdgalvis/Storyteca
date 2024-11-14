//import dotenv from 'dotenv';
//import { OpenAI } from 'openai';
//dotenv.config({ path: '../key.env' });
// const openai = new OpenAI({
//   apiKey: process.env.VITE_OPENAI_API_KEY,
  
// });
import { OpenAI } from 'openai';

const openai = new OpenAI({
  //apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
console.log(import.meta.env.VITE_OPENAI_API_KEY);
export default openai;





