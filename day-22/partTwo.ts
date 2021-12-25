import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let commands: Command[] = input.trim().split("\n").map((x: string): Command => {
    let st1: string[] = x.split(' ')
    let state: boolean = st1[0] === "on"
    let st2: string[] = st1[1].split(",").map(y => y.slice(2))
    return { state, xRange: st2[0].split("..").map(z => +z), yRange: st2[1].split("..").map(z => +z), zRange: st2[2].split("..").map(z => +z) }
})

type Command = {
    state: boolean
    xRange: number[],
    yRange: number[],
    zRange: number[]
}

class Cube {
    xRange: number[]
    yRange: number[]
    zRange: number[]

    constructor(xR: number[], yR: number[], zR: number[]) {
        this.xRange = xR
        this.yRange = yR
        this.zRange = zR
    }

    volume(): number {
        return (this.xRange[1] - this.xRange[0] + 1) * (this.yRange[1] - this.yRange[0] + 1) * (this.zRange[1] - this.zRange[0] + 1)
    }

    isOverlapping(other: Cube): boolean {
        let isIntersecting = (a: number[], b: number[]): boolean => a[0] <= b[1] && a[1] >= b[0]
        return isIntersecting(this.xRange, other.xRange) && isIntersecting(this.yRange, other.yRange) && isIntersecting(this.zRange, other.zRange)
    }

    getOverlap(other: Cube): Cube {
        let xR = [Math.max(this.xRange[0], other.xRange[0]), Math.min(this.xRange[1], other.xRange[1])]
        let yR = [Math.max(this.yRange[0], other.yRange[0]), Math.min(this.yRange[1], other.yRange[1])]
        let zR = [Math.max(this.zRange[0], other.zRange[0]), Math.min(this.zRange[1], other.zRange[1])]
        return new Cube(xR, yR, zR)
    }
}

let addCubes: Cube[] = []
let deletedCubes: Cube[] = []
const execute = ({ state, xRange, yRange, zRange }: Command) => {
    let cur = new Cube(xRange, yRange, zRange)
    let overlaps: Cube[] = []
    let rewritten: Cube[] = []
    for (let o of addCubes) if (cur.isOverlapping(o)) overlaps.push(cur.getOverlap(o))
    for (let o of deletedCubes) if (cur.isOverlapping(o)) rewritten.push(cur.getOverlap(o))
    addCubes.push(...rewritten)
    deletedCubes.push(...overlaps)
    if (state) { addCubes.push(cur) }
}
const total = (): bigint => {
    let t = 0n;
    for (let c of addCubes) t += BigInt(c.volume())
    for (let c of deletedCubes) t -= BigInt(c.volume())
    return t
}

for (let c of commands) {
    execute(c)
}

console.log(total())