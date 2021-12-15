import * as fs from 'fs'
import * as path from 'path'
import { astar, Graph } from './AStar'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const matrix: number[][] = input.split('\r\n').map((line: string) => line.split('').map((item: string) => parseInt(item)))

let wideArray: number[] = new Array()
let bigArray: number[][] = new Array()
let add: number

for (let j = 0; j < 5; j++) {
    add = j
    for (const row of matrix) {
        wideArray = []
        for (let i = 1; i < 6; i++) {
            wideArray.push(...row.map((item: number) => {
                if (item + add > 9) {
                    return item + add - 9
                } else {
                    return item + add
                }
            }))
            add++
        }
        bigArray.push(wideArray)
        add = j
    }
}

var graphWithWeight = new Graph(bigArray)

var start = graphWithWeight.grid[0][0]
var end = graphWithWeight.grid[bigArray[0].length - 1][bigArray.length - 1]
var result = astar.search(graphWithWeight, start, end)

let weightCount = 0
for (const node of result) {
    if (node.visited === true) {
        weightCount += node.weight
    }
}

console.log(weightCount)