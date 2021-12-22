import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const data: string[] = input.split('\r\n').slice(1, 20)

let onPoints = new Set()

for (const line of data) {
    const coOrd = line.split(',').map((elem: string) => elem.split('=')[1].split('..').map((elem: string) => parseInt(elem)))
    const add = line.includes('on') ? true : false
    for (let x = coOrd[0][0]; x < coOrd[0][1] + 1; x++) {
        for (let y = coOrd[1][0]; y < coOrd[1][1] + 1; y++) {
            for (let z = coOrd[2][0]; z < coOrd[2][1] + 1; z++) {
                const point = JSON.stringify([x, y, z])
                if (add && !onPoints.has(point)) {
                    onPoints.add(point)
                }
                else if (!add && onPoints.has(point)) {
                    onPoints.delete(point)
                }
            }
        }
    }
}

console.log(onPoints.size)