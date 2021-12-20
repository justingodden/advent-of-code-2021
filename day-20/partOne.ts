import * as fs from 'fs';
import * as path from 'path';

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const imageAlgo: string[] = input.split('\r\n\r\n')[0].split('')

let inputImage: string[][] = input.split('\r\n\r\n')[1].split('\r\n').map((line: string) => line.split(''))

const copyArray = (arr: string[][]): string[][] => [...arr].map(row => [...row])

const addBorders = (arr: string[][]): string[][] => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].unshift('.')
        arr[i].unshift('.')
        arr[i].push('.')
        arr[i].push('.')
    }
    arr.unshift('.'.repeat(arr[0].length).split(''))
    arr.unshift('.'.repeat(arr[0].length).split(''))
    arr.push('.'.repeat(arr[0].length).split(''))
    arr.push('.'.repeat(arr[0].length).split(''))

    return arr
}

const convertPixels = (arr: string[][]): string[][] => {
    let newArr: string[][] = copyArray(arr)
    let binaryStr = ''

    for (let y = 1; y < arr.length - 1; y++) {
        for (let x = 1; x < arr[0].length - 1; x++) {
            binaryStr = ''

            let digit = arr[y - 1][x - 1] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y - 1][x] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y - 1][x + 1] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y][x - 1] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y][x] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y][x + 1] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y + 1][x - 1] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y + 1][x] === '#' ? '1' : '0'
            binaryStr += digit

            digit = arr[y + 1][x + 1] === '#' ? '1' : '0'
            binaryStr += digit

            const index = parseInt(binaryStr, 2)
            newArr[y][x] = imageAlgo[index]
        }
    }
    return newArr
}

const enhancements = 50
for (let i = 0; i < enhancements; i++) {
    inputImage = addBorders(inputImage)
}

for (let i = 0; i < enhancements; i++) {
    inputImage = convertPixels(inputImage)
}

let counter = 0

for (let j = enhancements; j < inputImage.length - enhancements; j++) {
    for (let i = enhancements; i < inputImage[0].length - enhancements; i++) {
        if (inputImage[j][i] === '#') counter++
    }
}

console.log(counter)