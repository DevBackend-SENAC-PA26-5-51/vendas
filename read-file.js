const fs = require('fs');
const content = fs.readFileSync('src/transportadora/transportadora.service.ts', 'utf-8');
const lines = content.split('\n');
lines.forEach((line, i) => console.log(`${i+1} ${line}`));