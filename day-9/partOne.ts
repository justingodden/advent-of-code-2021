import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const data: number[][] = input.split('\r\n').map((val: string) => val.split('').map((val: string) => parseInt(val)))

let counter: number = 0

for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < data[0].length; i++) {
        // top left
        if (i === 0 && j === 0) {
            if (data[j][i] < data[j + 1][i] && data[j][i] < data[j][i + 1]) {
                counter += data[j][i] + 1
            }
        }

        // top right
        else if (j === 0 && i === data[0].length - 1) {
            if (data[j][i] < data[j][i - 1] && data[j][i] < data[j + 1][i]) {
                counter += data[j][i] + 1
            }
        }

        // bottom left
        else if (j === data.length - 1 && i === 0) {
            if (data[j][i] < data[j - 1][i] && data[j][i] < data[j][i + 1]) {
                counter += data[j][i] + 1
            }
        }

        // bottom right
        else if (j === data.length - 1 && i === data[0].length - 1) {
            if (data[j][i] < data[j - 1][i] && data[j][i] < data[j][i - 1]) {
                counter += data[j][i] + 1
            }
        }

        // top
        else if (j === 0) {
            if (data[j][i] < data[j][i - 1] && data[j][i] < data[j + 1][i] && data[j][i] < data[j][i + 1]) {
                counter += data[j][i] + 1
            }
        }

        // left
        else if (i === 0) {
            if (data[j][i] < data[j - 1][i] && data[j][i] < data[j][i + 1] && data[j][i] < data[j + 1][i]) {
                counter += data[j][i] + 1
            }
        }

        // right
        else if (i === data[0].length - 1) {
            if (data[j][i] < data[j - 1][i] && data[j][i] < data[j][i - 1] && data[j][i] < data[j + 1][i]) {
                counter += data[j][i] + 1
            }
        }

        // bottom
        else if (j === data.length - 1) {
            console.log('bottom')
            if (data[j][i] < data[j][i - 1] && data[j][i] < data[j - 1][i] && data[j][i] < data[j][i + 1]) {
                counter += data[j][i] + 1
            }
        }

        // middle
        else {
            if (data[j][i] < data[j - 1][i] && data[j][i] < data[j][i - 1] && data[j][i] < data[j + 1][i] && data[j][i] < data[j][i + 1]) {
                counter += data[j][i] + 1
            }
        }
    }
}

console.log(counter)