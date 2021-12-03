// npx ts-node ./day-3/partOne.ts

import * as fs from 'fs';
import * as path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const strArr: string[] = data.split('\n')

let gamma: string = ''
let epsilon: string = ''

for (let j = 0; j < strArr[0].length; j++) {
    let count: number = 0
    for (let i in strArr) {
        count += parseInt(strArr[i].charAt(j))
    }

    if (count > Math.floor(strArr.length / 2)) {
        gamma += '1'
        epsilon += '0'
    } else {
        gamma += '0'
        epsilon += '1'
    }
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))