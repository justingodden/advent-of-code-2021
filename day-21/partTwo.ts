const outcomes: any = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 }

const p1Start = 1
const p2Start = 7

interface Player {
    pos: number
    score: number
}

const singleStep = (player: Player, diceOutcome: number): void => {
    player.pos = ((player.pos - 1 + diceOutcome) % 10) + 1
    player.score += player.pos
}

const newUniverse = (p1: Player, p2: Player, p1Turn: boolean): number => {
    if (p1.score >= 21) {
        return 1;
    } else if (p2.score >= 21) {
        return 0;
    }

    const currPlayer = p1Turn ? p1 : p2
    let sum = 0
    for (let diceOutcome = 3; diceOutcome <= 9; diceOutcome++) {
        const oldPos = currPlayer.pos
        const oldScore = currPlayer.score
        singleStep(currPlayer, diceOutcome)
        const multiplier = outcomes[diceOutcome]
        sum += multiplier * newUniverse(p1, p2, !p1Turn)
        currPlayer.pos = oldPos
        currPlayer.score = oldScore
    }
    return sum
}

let p1: Player = {
    pos: p1Start,
    score: 0
};
let p2: Player = {
    pos: p2Start,
    score: 0
}

console.log(newUniverse(p1, p2, false))