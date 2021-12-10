import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const data: string[] = input.split('\r\n')

let syntax = new Array()

const openCases = ['(', '[', '{', '<']

interface CloseLookup {
    [char: string]: string
}

const closeLookup: CloseLookup = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
}

interface ScoreLookup {
    [char: string]: number
}

const scoreLookup: ScoreLookup = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
    'X': 0
}

const findIllegal = (line: string): string => {
    for (const char of line.split('')) {
        if (openCases.includes(char)) {
            syntax.push(char)
        }
        else {

            if (syntax.at(-1) === closeLookup[char]) {
                syntax = syntax.slice(0, -1)
            }
            else {
                return char
            }
        }
    }
    return 'X'
}

let penalty = 0

for (const line of data) {
    if (findIllegal(line) !== undefined) {
        penalty += scoreLookup[findIllegal(line)]
    }
}

console.log(penalty)