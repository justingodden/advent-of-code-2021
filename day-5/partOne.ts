import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const data: number[][][] = input.split('\r\n').map(
    (item: string) => item.split(' -> ').map(
        (item: string) => item.split(',').map(
            (item: string) => parseInt(item))
    ))

const isHorizontalOrVertical = (coOrds: number[][]): boolean => {
    // input: [[x1, y1], [x2, y2]]
    if (coOrds[0][0] === coOrds[1][0] || coOrds[0][1] === coOrds[1][1]) {
        return true;
    } else {
        return false
    }
}

const getInnerCoOrds = (coOrds: number[][]): number[][] => {
    let array: number[][] = new Array()

    // if vertical
    if (coOrds[0][0] === coOrds[1][0]) {

        // if first number is smaller, use that to start in for loop
        if (coOrds[0][1] < coOrds[1][1]) {
            for (let i = coOrds[0][1]; i <= coOrds[1][1]; i++) {
                array.push([coOrds[0][0], i])
            }
        } else {
            for (let i = coOrds[1][1]; i <= coOrds[0][1]; i++) {
                array.push([coOrds[0][0], i])
            }
        }
        // horizontal
    } else {
        if (coOrds[0][0] < coOrds[1][0]) {
            for (let i = coOrds[0][0]; i <= coOrds[1][0]; i++) {
                array.push([i, coOrds[0][1]])
            }
        } else {
            for (let i = coOrds[1][0]; i <= coOrds[0][0]; i++) {
                array.push([i, coOrds[0][1]])
            }
        }
    }
    return array
}

let arrayOfPoints: string[] = new Array()

for (let coOrds of data) {
    if (isHorizontalOrVertical(coOrds)) {
        getInnerCoOrds(coOrds).forEach((item: number[]) => {
            arrayOfPoints.push(item.toString())
        })
    }
}

const getDuplicates = (arr: string[]): string[] => [...new Set(arr.filter((e, i, a) => a.indexOf(e) !== i))]

console.log(getDuplicates(arrayOfPoints).length)