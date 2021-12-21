export { }

let player1Score = 0
let player2Score = 0

let player1Pos = 7
let player2Pos = 1

let dicePos = 1
let counter = 0
let finalCounter = 0
let losingScore = 0

let diceMove = 0

while (player1Score < 1000 && player2Score < 1000) {
    if (player2Score >= 1000) break
    let player1Str = 'P1 rolls '
    diceMove = 0
    for (let i = 0; i < 3; i++) {
        if (dicePos === 101) dicePos = 1
        player1Str += dicePos.toString() + '+'
        diceMove += dicePos
        counter++
        dicePos++
    }
    diceMove %= 10
    player1Pos = diceMove === 0 ? player1Pos + 10 : player1Pos + diceMove
    player1Pos %= 10
    if (player1Pos === 0) player1Pos = 10
    player1Score += player1Pos


    if (player1Score >= 1000) {
        finalCounter = counter
        losingScore = player2Score
    }
    player1Str += ` and moves to space ${player1Pos} for score ${player1Score}`
    console.log(player1Str)


    if (player1Score >= 1000) break
    let player2Str = 'P2 rolls '
    diceMove = 0
    for (let i = 0; i < 3; i++) {
        if (dicePos === 101) dicePos = 1
        player2Str += dicePos.toString() + '+'
        diceMove += dicePos
        counter++
        dicePos++
    }
    diceMove %= 10
    player2Pos = diceMove === 0 ? player2Pos + 10 : player2Pos + diceMove
    player2Pos %= 10
    if (player2Pos === 0) player2Pos = 10
    player2Score += player2Pos


    if (player2Score >= 1000) {
        finalCounter = counter
        losingScore = player1Score
    }
    player2Str += ` and moves to space ${player2Pos} for score ${player2Score}`
    console.log(player2Str)


}

console.log(losingScore * counter)