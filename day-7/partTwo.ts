import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
let data: number[] = input.split(',').map((item: string) => parseInt(item));

const sum: number = data.reduce((prevVal: number, currVal: number) => prevVal + currVal, 0)
const mean: number = Math.floor(sum / data.length)

const res = (n: number): number => (n * (n + 1)) / 2

let counter: number = 0

for (const point of data) {
    counter += res(Math.abs(mean - point))
}

console.log(counter)