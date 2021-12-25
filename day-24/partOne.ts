import * as fs from 'fs'
import * as path from 'path'

const input: string[] = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n')

let w: any = 0
let x: number = 0
let y: number = 0
let z: number = 0

const whichFunc = (line: string): void => {
    const instruction = line.split(' ')[0]
    const a = line.split(' ')[1]
    const b = line.split(' ')[2]
    switch (instruction) {
        case 'add':
            operation(a, b, add)
            break
        case 'mul':
            operation(a, b, mul)
            break
        case 'div':
            operation(a, b, div)
            break
        case 'mod':
            operation(a, b, mod)
            break
        case 'eql':
            operation(a, b, eql)
            break
    }
}

const add = (a: number, b: number): number => {
    return a + b
}
const mul = (a: number, b: number): number => {
    return a * b
}
const div = (a: number, b: number): number => {
    return Math.floor(a / b)
}
const mod = (a: number, b: number): number => {
    return a % b
}
const eql = (a: number, b: number): number => {
    if (a === b) return 1
    return 0
}

const isNum = (b: string) => {
    return !(/[a-z]/).test(b)
}

const operation = (a: string, b: string, func: (c: number, d: number) => number) => {
    switch (a) {
        case 'w':
            if (isNum(b)) w = func(w, parseInt(b))
            else w = func(w, eval(`${b}`))
            break
        case 'x':
            if (isNum(b)) x = func(x, parseInt(b))
            else x = func(x, eval(`${b}`))
            break
        case 'y':
            if (isNum(b)) y = func(y, parseInt(b))
            else y = func(y, eval(`${b}`))
            break
        case 'z':
            if (isNum(b)) z = func(z, parseInt(b))
            else z = func(z, eval(`${b}`))
            break
    }
}

let modelNumInt = 99999999999999
let modelNumStr = modelNumInt.toString()

let running: boolean = true
while (running) {
    let modelNum: number[] = modelNumStr.split('').map((num: string): number => parseInt(num))
    w = 0
    x = 0
    y = 0
    z = 0
    for (const line of input) {
        if (line.split(' ')[0] === 'inp') w = modelNum.shift()
        else whichFunc(line)
    }
    if (z === 0) {
        console.log(modelNumStr)
        running = false
    } else {
        modelNumInt--
        modelNumStr = modelNumInt.toString()
    }
}