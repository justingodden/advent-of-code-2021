import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const data: string[] = input.split('\r\n')


const openCases = ['(', '[', '{', '<']

interface CharLookup {
    [char: string]: string
}

const closeLookup: CharLookup = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
}

const openLookup: CharLookup = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

interface ScoreLookup {
    [char: string]: number
}

const scoreLookup: ScoreLookup = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

const notIllegal = (line: string): string[] => {
    let syntax = new Array()
    for (const char of line.split('')) {
        if (openCases.includes(char)) {
            syntax.push(char)
        }
        else {

            if (syntax.at(-1) === closeLookup[char]) {
                syntax = syntax.slice(0, -1)
            }
            else {
                return []
            }
        }
    }
    return syntax
}

const getPenalty = (line: string[]): number => {
    let penalty = 0
    if (line.length !== 0) {
        for (let i = line.length - 1; i >= 0; i--) {
            penalty = (penalty * 5) + scoreLookup[openLookup[line[i]]]
        }
    }
    return penalty
}

let penaltyArr = new Array()
let currPenalty = 0
for (const line of data) {
    currPenalty = getPenalty(notIllegal(line))
    if (currPenalty !== 0) {
        penaltyArr.push(currPenalty)
    }
}

penaltyArr.sort((a, b) => a - b)

console.log(penaltyArr[Math.round(penaltyArr.length / 2 - 1)])