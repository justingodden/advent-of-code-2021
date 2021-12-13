import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const dots: number[][] = input.split('\r\n\r\n')[0].split('\r\n').map((row: string) => row.split(',').map((num: string) => parseInt(num)))
const folds = input.split('\r\n\r\n')[1].split('\r\n').map((line: string) => line.split(' ')[2].split('='))

const fold = (axis: string, foldPointStr: string, point: number[]): number[] => {
    const foldPoint = parseInt(foldPointStr)
    if (axis === 'x') {
        const dif = point[0] - foldPoint
        if (dif < 0) {
            return point
        } else {
            return [point[0] - (2 * dif), point[1]]
        }
    } else {
        const dif = point[1] - foldPoint
        if (dif < 0) {
            return point
        } else {
            return [point[0], point[1] - (2 * dif)]
        }
    }
}

let newDots: number[][] = dots

for (const instruction of folds) {
    newDots = newDots.map((point: number[]) => fold(instruction[0], instruction[1], point))
    const set = new Set(newDots.map((point: number[]) => JSON.stringify(point)))
    newDots = Array.from(set).map((point: string) => JSON.parse(point))
}

function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

let row0: string = ' '.repeat(39)
let row1: string = ' '.repeat(39)
let row2: string = ' '.repeat(39)
let row3: string = ' '.repeat(39)
let row4: string = ' '.repeat(39)
let row5: string = ' '.repeat(39)

for (const point of newDots) {
    switch (point[1]) {
        case 0:
            row0 = setCharAt(row0, point[0], '#')
            break
        case 1:
            row1 = setCharAt(row1, point[0], '#')
            break
        case 2:
            row2 = setCharAt(row2, point[0], '#')
            break
        case 3:
            row3 = setCharAt(row3, point[0], '#')
            break
        case 4:
            row4 = setCharAt(row4, point[0], '#')
            break
        case 5:
            row5 = setCharAt(row5, point[0], '#')
            break
    }
}

console.log()
console.log(row0)
console.log(row1)
console.log(row2)
console.log(row3)
console.log(row4)
console.log(row5)