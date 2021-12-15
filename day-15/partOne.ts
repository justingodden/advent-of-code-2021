import * as fs from 'fs'
import * as path from 'path'
import { astar, Graph } from './AStar'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const matrix: number[][] = input.split('\r\n').map((line: string) => line.split('').map((item: string) => parseInt(item)))

var graphWithWeight = new Graph(matrix)

var start = graphWithWeight.grid[0][0]
var end = graphWithWeight.grid[matrix[0].length - 1][matrix.length - 1]
var result = astar.search(graphWithWeight, start, end)

let weightCount = 0
for (const node of result) {
    if (node.visited === true) {
        weightCount += node.weight
    }
}

console.log(weightCount)