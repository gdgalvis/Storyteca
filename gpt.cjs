//console.log('whas good world')
require('dotenv').config();
const readline = require ('readline')
const { generateMeta } = require('./controllers/openaiController.cjs');
const openaiConfig = require('./config/openaiConfig.cjs');
const { createInterface } = require('readline');;
 const r1 = createInterface({
     input : process.stdin,
     output:process.stdout

 })
//' Youtube video Title \n',

r1.question('',generateMeta)
r1.on('close', () => {
    console.log('Prompt completed. Exiting process.');
    process.exit(0); // Ensures the process exits
});

