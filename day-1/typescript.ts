// to get started:
// npm install typescript --save-dev
// npm install --save-dev @types/node
// npx ts-node typescript.ts

import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const input: number[] = data.split('\n').map(Number)

let count: number = 0

for (let i: number = 0; i <= input.length; i++) {
    if (i == 0) { continue; }
    else if (input[i] > input[i - 1]) { count++ };
};

console.log(count)



count = 0

for (let i = 0; i <= input.length; i++) {
    if ([0, 1, 2].includes(i)) { continue; }
    else if (input[i] + input[i - 1] + input[i - 2] > input[i - 1] + input[i - 2] + input[i - 3]) { count++ };
};

console.log(count)