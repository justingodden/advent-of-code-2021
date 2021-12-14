import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

let template: string = input.split('\r\n\r\n')[0]

let pairs = input.split('\r\n\r\n')[1].split('\r\n')

let pairMap: any = {}
let pairCount: any = {}
let letterCount: any = {}

for (const pair of pairs) {
    pairMap[pair.split(' -> ')[0]] = pair.split(' -> ')[1]
}

for (const pair of pairs) {
    pairCount[pair.split(' -> ')[0]] = 0
}

for (let i = 0; i < template.length - 1; i++) {
    pairCount[template.slice(i, i + 2)]++
}

for (const pair of pairs) {
    for (const letter of pair.split(' -> ')[0].split('')) {
        letterCount[letter] = 0
    }
}

let tempPairCount = { ...pairCount }

for (let i = 0; i < 40; i++) {
    for (const key of Object.keys(pairCount)) {
        const count = pairCount[key]
        const newChar = pairMap[key]
        tempPairCount[key] -= count

        const firstNewPair = key.charAt(0) + newChar
        const secondNewPair = newChar + key.charAt(1)

        tempPairCount[firstNewPair] += count
        tempPairCount[secondNewPair] += count
    }
    pairCount = { ...tempPairCount }
}

for (const key of Object.keys(pairCount)) {
    if (key.charAt(0) === key.charAt(1)) {
        letterCount[key.charAt(0)] += 2 * pairCount[key]
    } else {
        for (const char of key.split('')) {
            letterCount[char] += pairCount[key]
        }
    }
}

for (const letter of Object.keys(letterCount)) {
    if (letter === template.charAt(0) || letter === template.charAt(template.length - 1)) {
        letterCount[letter] = ((letterCount[letter] - 1) / 2) + 1
    } else {
        letterCount[letter] = letterCount[letter] / 2
    }
}
let countsArr: number[] = new Array()

for (const key of Object.keys(letterCount)) {
    countsArr.push(letterCount[key])
}

countsArr.sort()
console.log(countsArr[countsArr.length - 1] - countsArr[0])