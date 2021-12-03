// npx ts-node ./day-3/partTwo.ts

import * as fs from 'fs';
import * as path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const strArr: string[] = data.split('\n')

let twoDArray = new Array()

for (let i in strArr) {
    twoDArray.push(Array.from(strArr[i]))
}

let o2Arr = twoDArray
let c02Arr = twoDArray

for (let j = 0; j < strArr[0].length; j++) {

    let count: number = 0
    for (let i = 0; i < o2Arr.length; i++) {
        count += parseInt(o2Arr[i][j])
    }
    if (o2Arr.length === 1) break;

    else if (count === o2Arr.length / 2) {
        o2Arr = o2Arr.filter(row => row[j] == 1)
    }
    else if (count >= o2Arr.length / 2) {
        o2Arr = o2Arr.filter(row => row[j] == 1)
    }
    else {
        o2Arr = o2Arr.filter(row => row[j] == 0)
    }
}


for (let j = 0; j < strArr[0].length; j++) {

    let count: number = 0
    for (let i = 0; i < c02Arr.length; i++) {
        count += parseInt(c02Arr[i][j])
    }
    if (c02Arr.length === 1) break;

    else if (count === c02Arr.length / 2) {
        c02Arr = c02Arr.filter(row => row[j] == 0)
    }
    else if (count >= c02Arr.length / 2) {
        c02Arr = c02Arr.filter(row => row[j] == 0)
    }
    else {
        c02Arr = c02Arr.filter(row => row[j] == 1)
    }
}

let oxygen: string = ''
let carbon: string = ''

o2Arr[0].forEach((elm: string) => oxygen += elm);
c02Arr[0].forEach((elm: string) => carbon += elm)

console.log(parseInt(oxygen, 2) * parseInt(carbon, 2))