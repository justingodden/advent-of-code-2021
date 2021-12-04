import * as fs from 'fs';
import * as path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const gameNumbers = input.split('\r\n\r\n')[0].split(',').map(str => parseInt(str))
let gameBoard = input.replace(/  +/g, ' ').replace(/\n /g, '\n').split('\r\n\r\n').slice(1)
let gameBoards = gameBoard.map(board => board.split('\r\n').map(row => row.split(' ').map(str => parseInt(str))))

const removeNumFromGrid = (array: number[][], num: number): number[][] => {
    return array.map(row => row.map(item => item === num ? NaN : item))
}

const checkRow = (row: number[]): boolean => {
    let complete: boolean = true
    row.forEach(item => {
        if (!Number.isNaN(item)) {
            complete = false
        }
    })
    return complete
}

const checkColumns = (array: number[][]): boolean => {
    let complete: boolean = false
    for (let j = 0; j < array[0].length; j++) {
        if (complete) {
            return complete;
        }
        let tempComplete: boolean = true
        for (let i = 0; i < array.length; i++) {
            if (!Number.isNaN(array[i][j])) {
                tempComplete = false;
            }
        }
        if (tempComplete) complete = true;
    }
    return complete;
}

const replaceNaNWithZero = (array: number[][]): number[][] => {
    return array.map(row => row.map(item => Number.isNaN(item) ? 0 : item))
}

const sumBoard = (array: number[][]): number => {
    let total: number = 0
    array.forEach(row => total += row.reduce((a, b) => a + b))
    return total
}

const isComplete = (array: number[][]): boolean => {
    let complete: boolean = false
    array.forEach(row => {
        if (checkRow(row)) complete = true
    })
    if (checkColumns(array)) complete = true
    return complete
}

let winningTotal: number | undefined = undefined

const playGame = (gameBoards: number[][][], gameNumbers: number[]): number | void => {
    gameNumbers.forEach(num => {
        for (let i = 0; i < gameBoards.length; i++) {
            gameBoards[i] = removeNumFromGrid(gameBoards[i], num)
            if (isComplete(gameBoards[i])) {
                let completeBoard = replaceNaNWithZero(gameBoards[i])
                if (winningTotal === undefined) {
                    winningTotal = sumBoard(completeBoard) * num
                }
            }
        }
    }
    )
}
playGame(gameBoards, gameNumbers)
console.log(winningTotal)