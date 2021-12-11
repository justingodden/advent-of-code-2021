import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let data: number[][] = input.split('\r\n').map((line: string) => line.split('').map((char: string) => parseInt(char)))
let totalFlashes: number = 0

const addOneAll = (): void => {
    data = data.map((row: number[]) => row.map((num: number) => num + 1))
}

const anyToFlash = (): boolean => {
    let toFlash = false
    data.forEach((row: number[]) => row.forEach((num: number) => {
        if (num > 9 && num < 999) {
            toFlash = true
        }
    }))
    return toFlash
}

const flashThenAdd = (): void => {
    data.forEach((row: number[], j: number) => row.forEach((num: number, i: number) => {
        if (num > 9 && num < 999) {
            data[j][i] = 999
            totalFlashes++

            // topleft
            try {
                data[j - 1][i - 1]++
            } catch { }
            // topmiddle
            try {
                data[j - 1][i]++
            } catch { }
            // topright
            try {
                data[j - 1][i + 1]++
            } catch { }
            // middleleft
            try {
                data[j][i - 1]++
            } catch { }
            // middleright
            try {
                data[j][i + 1]++
            } catch { }
            // bottomleft
            try {
                data[j + 1][i - 1]++
            } catch { }
            // bottommiddle
            try {
                data[j + 1][i]++
            } catch { }
            // bottomright
            try {
                data[j + 1][i + 1]++
            } catch { }
        }
    }
    ))
}

const resetFlashed = (): void => {
    data.forEach((row: number[], j: number) => row.forEach((num: number, i: number) => {
        if (num >= 999) {
            data[j][i] = 0
        }
    }
    ))
}

for (let iter = 0; iter < 100; iter++) {
    addOneAll()
    let running: boolean = true
    while (running) {
        flashThenAdd()
        running = anyToFlash()
    }
    resetFlashed()
}

console.log(totalFlashes)