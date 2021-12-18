import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const data: string[] = input.split('\r\n')

const reverseString = (str: string): string => {
    return str.split('').reverse().join('')
}

const explode = (line: string): string => {
    let brackets: number = 0

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '[') brackets++
        else if (line[i] === ']') brackets--

        else if (brackets >= 5) {
            const [pattern, first, second]: any = line.slice(i).match(/(\d+),(\d+)/)
            let left: string = reverseString(line.slice(0, i - 1))
            left = left.replace(/(\d+)/, (num: string) => reverseString(`${+reverseString(num) + +first}`))
            left = reverseString(left)

            const right: string = line.slice(i + pattern.length + 1).replace(/(\d+)/, (num: string) => `${+num + +second}`)
            return `${left}0${right}`
        }
    }
    return line
}

const split = (line: string): string => {
    return line.replace(/(\d\d+)/, (num: string) => `[${Math.floor(+num / 2)},${Math.ceil(+num / 2)}]`)
}

const explodeAndSplit = (line: string): string => {
    while (true) {
        if (line !== explode(line)) {
            line = explode(line)
            continue
        }
        if (line !== split(line)) {
            line = split(line)
            continue
        }
        return line
    }
}

const magnitude = (line: string): any => {
    if (typeof line === 'string') {
        line = JSON.parse(line)
    }
    if (!Array.isArray(line)) {
        return line
    }
    return 3 * magnitude(line[0]) + 2 * magnitude(line[1])
}

let largestMag = 0

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
        if (i === j) continue
        const mag = magnitude(explodeAndSplit('[' + data[i] + ',' + data[j] + ']'))
        if (mag > largestMag) largestMag = mag
    }
}

console.log(largestMag)