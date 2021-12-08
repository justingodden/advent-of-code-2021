import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const data: string[][][] = input.split('\r\n').map((val: string) => val.split(' | ').map((val: string) => val.split(' ')))

const dataTemp = data[0]


// find len 2, possible seg3, seg6
const step1 = (data: string[]): string[] => {
    let seg3Arr: string[] = [""]
    for (const code of data) {
        if (code.length === 2) {
            seg3Arr = code.split("")
        }
    }
    return seg3Arr
}

// find len 3, and seg1
const step2 = (data: string[], seg3Arr: string[]): string => {
    let seg1: string = ""
    for (const code of data) {
        if (code.length === 3) {
            for (const char of code.split("")) {
                if (!seg3Arr.includes(char)) {
                    seg1 = char
                }
            }
        }
    }
    return seg1
}

// find len 4, possible seg2, seg4
const step3 = (data: string[], seg3Arr: string[]): string[] => {
    let seg2Arr: string[] = []
    for (const code of data) {
        if (code.length === 4) {
            for (const char of code.split("")) {
                if (!seg3Arr.includes(char)) {
                    seg2Arr.push(char)
                }
            }
        }
    }
    return seg2Arr
}

// find len 6, seg7
const step4 = (data: string[], seg1: string, seg2Arr: string[], seg3Arr: string[]): string => {
    let seg7: string = ""
    for (const code of data) {
        if (code.length === 6) {
            if (code.split("").includes(seg1) && code.split("").includes(seg2Arr[0]) && code.split("").includes(seg2Arr[1]) &&
                code.split("").includes(seg3Arr[0]) && code.split("").includes(seg3Arr[1])) {
                seg7 = code.replace(seg1, "").replace(seg2Arr[0], "").replace(seg2Arr[1], "").replace(seg3Arr[0], "").replace(seg3Arr[1], "")
            }
        }
    }
    return seg7
}

// find len 6, XOR seg2
const step5 = (data: string[], seg1: string, seg2Arr: string[], seg3Arr: string[], seg7: string): string[] => {
    let seg2: string = ""
    let seg4: string = ""
    let seg5: string = ""
    for (const code of data) {
        if (code.length === 6) {
            if (
                (code.split("").includes(seg2Arr[0]) && !code.split("").includes(seg2Arr[1])) ||
                (!code.split("").includes(seg2Arr[0]) && code.split("").includes(seg2Arr[1]))
            ) {
                if (code.split("").includes(seg2Arr[0])) {
                    seg2 = seg2Arr[0]
                    seg4 = seg2Arr[1]
                    seg5 = code.replace(seg1, "").replace(seg3Arr[0], "").replace(seg3Arr[1], "").replace(seg7, "").replace(seg2Arr[0], "")

                } else {
                    seg2 = seg2Arr[1]
                    seg4 = seg2Arr[0]
                    seg5 = code.replace(seg1, "").replace(seg3Arr[0], "").replace(seg3Arr[1], "").replace(seg7, "").replace(seg2Arr[1], "")
                }
            }
        }
    }
    return [seg2, seg4, seg5]
}

// find len 6, XOR seg3
const step6 = (data: string[], seg1: string, seg2Arr: string[], seg3Arr: string[], seg7: string): string[] => {
    let seg3: string = ""
    let seg6: string = ""
    for (const code of data) {
        if (code.length === 6) {
            if (
                (code.split("").includes(seg3Arr[0]) && !code.split("").includes(seg3Arr[1])) ||
                (!code.split("").includes(seg3Arr[0]) && code.split("").includes(seg3Arr[1]))
            ) {
                if (code.split("").includes(seg3Arr[0])) {
                    seg6 = seg3Arr[0]
                    seg3 = seg3Arr[1]
                } else {
                    seg6 = seg3Arr[1]
                    seg3 = seg3Arr[0]
                }
            }
        }
    }
    return [seg3, seg6]
}

const findSegs = (data: string[]): any => {
    let seg3Arr = step1(data)
    let seg1 = step2(data, seg3Arr)
    let seg2Arr = step3(data, seg3Arr)
    let seg7 = step4(data, seg1, seg2Arr, seg3Arr)
    let seg2 = step5(data, seg1, seg2Arr, seg3Arr, seg7)[0]
    let seg4 = step5(data, seg1, seg2Arr, seg3Arr, seg7)[1]
    let seg5 = step5(data, seg1, seg2Arr, seg3Arr, seg7)[2]
    let seg3 = step6(data, seg1, seg2Arr, seg3Arr, seg7)[0]
    let seg6 = step6(data, seg1, seg2Arr, seg3Arr, seg7)[1]
    const segs = {
        1: seg1,
        2: seg2,
        3: seg3,
        4: seg4,
        5: seg5,
        6: seg6,
        7: seg7
    }
    return segs
}

const acc0 = ["1", "2", "3", "5", "6", "7"]
const acc1 = ["3", "6"]
const acc2 = ["1", "3", "4", "5", "7"]
const acc3 = ["1", "3", "4", "6", "7"]
const acc4 = ["2", "3", "4", "6",]
const acc5 = ["1", "2", "4", "6", "7"]
const acc6 = ["1", "2", "4", "5", "6", "7"]
const acc7 = ["1", "3", "6",]
const acc8 = ["1", "2", "3", "4", "5", "6", "7"]
const acc9 = ["1", "2", "3", "4", "6", "7"]
const accs = [acc0, acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9]

const equals = (a: string[], b: string[]): boolean => JSON.stringify(a) === JSON.stringify(b);

const decode = (data: string[][]): number[] => {
    let segs = findSegs(data[0])
    let outputNumArr = new Array()
    for (const code of data[1]) {
        let outputNum = 99

        let tempCode = code
        for (const key of Object.keys(segs)) {
            tempCode = tempCode.replace(segs[key], key)
        }
        const tempCodeArr = tempCode.toString().split("").sort()
        for (let i = 0; i < accs.length; i++) {
            if (equals(accs[i], tempCodeArr)) {
                outputNum = i
            }
        }
        outputNumArr.push(outputNum)
    }
    return outputNumArr
}

let allCodes: number[] = []

for (const singleData of data) {
    allCodes = allCodes.concat(decode(singleData))
}

const occurrences = allCodes.reduce((acc: any, curr: any) => {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
}, {});

console.log(occurrences)

console.log(occurrences['1'] + occurrences['4'] + occurrences['7'] + occurrences['8'])