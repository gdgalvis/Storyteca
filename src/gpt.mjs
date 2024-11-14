


import openaiController from './controllers/openaiController.mjs';
import openaiConfig from './config/openaiConfig.mjs';
const input = process.argv[2]; 

if (!input) {
    console.log('No input provided.');
    process.exit(1);
}



openaiController.generateMeta(input)
    .then((result) => {
        console.log('Generated Metadata:', result);
    })
    .catch((error) => {
        console.error('Error generating metadata:', error);
    });


