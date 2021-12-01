const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');
const input = data.split('\n').map(Number)

let count = 0

for (let i = 0; i <= input.length; i++) {
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