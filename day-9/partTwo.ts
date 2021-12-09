import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const data: number[][] = input.split('\r\n').map((val: string) => val.split('').map((val: string) => parseInt(val)))

let cols = data[0].length
let rows = data.length;

const getAdjacent = (i: number, j: number) => {
    let adjPoints = new Array()

    // if not left column
    if (i > 0) {
        // add left point
        adjPoints.push({ i: i - 1, j: j })
    }

    // if not top row
    if (j > 0) {
        // add above point
        adjPoints.push({ i: i, j: j - 1 })
    }

    // if not right column
    if (i < cols - 1) {
        // add right point
        adjPoints.push({ i: i + 1, j: j })
    }

    // if not bottom row
    if (j < rows - 1) {
        // add below point
        adjPoints.push({ i: i, j: j + 1 })
    }
    return adjPoints
}

const getLowPoints = () => {
    let lowPoints = new Array()

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const adjPoints = getAdjacent(i, j)
            let depthVals = adjPoints.map(point => data[point.j][point.i])
            // compare the depth values of adjacent points to current point
            if (Math.min(...depthVals) > data[j][i]) {
                lowPoints.push({ i: i, j: j })
            }
        }
    }
    return lowPoints
}

const recursion = (i: number, j: number) => {
    // if not boundary, count towards total boundary size
    if (data[j][i] < 9) {
        basinSize++
        // if boundary, exit recursion!
    } else {
        return
    }
    // if not boundary, set that point to a boundary - effectively removing from possible recursion
    data[j][i] = 9
    // repeat for remaining adjacent points
    getAdjacent(i, j).forEach(point => recursion(point.i, point.j))
}

let basinSizeArr: number[] = []
let basinSize: number
const lowPoints = getLowPoints()

// recursion for each basin low points
lowPoints.forEach(point => {
    basinSize = 0
    recursion(point.i, point.j)
    basinSizeArr.push(basinSize)
})

// typed array is easier to sort
const typedArray = new Int8Array(basinSizeArr).sort().reverse()

console.log(typedArray[0] * typedArray[1] * typedArray[2])