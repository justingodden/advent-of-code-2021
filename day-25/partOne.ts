import * as fs from 'fs'
import * as path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
let data = input.split('\r\n').map((line: string) => line.split(''))

const width = data[0].length
const height = data.length

const moveEast = (arr: string[][]): string[][] => {
    let newArr = JSON.parse(JSON.stringify(arr))

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            if (arr[j][i] === '>') {
                if (i === width - 1) {
                    if (arr[j][0] === '.') {
                        newArr[j][i] = '.'
                        newArr[j][0] = '>'
                    }
                }
                else if (arr[j][i + 1] === '.') {
                    newArr[j][i] = '.'
                    newArr[j][i + 1] = '>'
                }
            }
        }
    }
    return newArr
}

const moveSouth = (arr: string[][]): string[][] => {
    let newArr = JSON.parse(JSON.stringify(arr))

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            if (arr[j][i] === 'v') {
                if (j === height - 1) {
                    if (arr[0][i] === '.') {
                        newArr[j][i] = '.'
                        newArr[0][i] = 'v'
                    }
                }
                else if (arr[j + 1][i] === '.') {
                    newArr[j][i] = '.'
                    newArr[j + 1][i] = 'v'
                }
            }
        }
    }
    return newArr
}

let counter = 0
let running = true

while (running) {
    let currentArr = JSON.parse(JSON.stringify(data))
    data = moveEast(data)
    data = moveSouth(data)
    counter++
    if (JSON.stringify(currentArr) == JSON.stringify(data)) running = false
}
console.log(counter)