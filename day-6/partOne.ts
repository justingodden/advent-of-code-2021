import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

let data: number[] = input.split(',').map((item: string) => parseInt(item));

const occurrences = data.reduce((acc: any, curr: any) => {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
}, {});

occurrences['0'] = 0
occurrences['6'] = 0
occurrences['7'] = 0
occurrences['8'] = 0

const days = 256

for (let i = 0; i < days; i++) {
    const zeros = occurrences['0']
    occurrences['0'] = occurrences['1']
    occurrences['1'] = occurrences['2']
    occurrences['2'] = occurrences['3']
    occurrences['3'] = occurrences['4']
    occurrences['4'] = occurrences['5']
    occurrences['5'] = occurrences['6']
    occurrences['6'] = occurrences['7'] + zeros
    occurrences['7'] = occurrences['8']
    occurrences['8'] = zeros
}

let counter = 0
for (const key of Object.keys(occurrences)) {
    counter += occurrences[key]
}

console.log(counter)