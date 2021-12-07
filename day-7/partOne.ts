import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
let data: number[] = input.split(',').map((item: string) => parseInt(item));
data = data.sort()

const median: number = data[(data.length / 2) - 1]
let counter = 0

for (const point of data) {
    counter += Math.abs(median - point)
}

console.log(counter)