import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const data: string[] = input.split('\r\n')

// empty lists for each node to append to
let edges: any = {}
for (const line of data) {
    const a = line.split('-')[0]
    const b = line.split('-')[1]
    edges[a] = []
    edges[b] = []
}

// mapping of all connections
for (const line of data) {
    const a = line.split('-')[0]
    const b = line.split('-')[1]
    edges[a].push(b)
    edges[b].push(a)

}
const END = "end";
const START = "start";

const isLower = (edge: string): boolean => {
    return edge === edge.toLowerCase()
}

let paths: string[][] = []

const findPaths = (edge: string, path: string[] = []) => {
    const nextPath: string[] = [...path, edge]

    if (edge === END) {
        paths.push(nextPath)
        return
    }

    edges[edge].forEach((conn: string) => {
        if (isLower(conn) && path.includes(conn)) {
            return
        }
        findPaths(conn, nextPath)
    })
}

findPaths(START)

console.log(paths.length)