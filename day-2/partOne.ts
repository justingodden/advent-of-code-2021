
import fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const strArr: string[] = data.split('\r\n')

let x: number = 0
let y: number = 0

strArr.forEach((str, idx) => {
    let direction: string = str.replace(/[^a-zA-Z]/g, '')
    let value: number = parseInt(str.replace(/[^0-9]/g, ''))
    switch (direction) {
        case "forward":
            x += value
            break;
        case "down":
            y += value
            break;
        case "up":
            y -= value
            break;
    }
})

console.log(x * y)