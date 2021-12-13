import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const dots: number[][] = input.split('\r\n\r\n')[0].split('\r\n').map((row: string) => row.split(',').map((num: string) => parseInt(num)))
// const folds = input.split('\r\n\r\n')[1].split('\r\n')

const fold = (axis: string, foldPoint: number, point: number[]): number[] => {
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

// hard-code first fold:
// fold along x=655
const axis = 'x'
const foldPoint = 655

const newDots: number[][] = dots.map((point: number[]) => fold(axis, foldPoint, point))

let set = new Set(newDots.map((point: number[]) => JSON.stringify(point)))
console.log(set.size)