import * as fs from 'fs'
import * as path from 'path'

const input: string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const hexToBin: any = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
}

let encodedStr: string = ''
for (const char of input.split('')) {
    encodedStr += hexToBin[char]
}

let versionSum: number = 0

const parse = (packet: string): any => {
    versionSum += parseInt(packet.slice(0, 3), 2)
    const type = parseInt(packet.slice(3, 6), 2)
    let position: number

    // literal value type
    if (type === 4) {
        // beginning of first byte's prefix
        position = 6

        // prefix of 1 denotes it is not the last byte
        while (packet[position] === '1') {
            // look at next byte's prefix
            position += 5
        }
        return position + 5
    }
    // operator type
    else {
        let lengthType: string = packet[6]

        // I == 0 -> len == 15-bit (number of bin in sub-packet)
        if (lengthType === '0') {
            const subPacketLen: number = parseInt(packet.slice(7, 22), 2)
            position = 0

            while (position < subPacketLen) {
                position += parse(packet.slice(22 + position))
            }
            return position + 22
        }

        // I == 1 -> len == 11-bit (number of subpackets)
        else {
            const numOfSubPackets: number = parseInt(packet.slice(7, 18), 2)
            position = 18

            for (let i = 0; i < numOfSubPackets; i++) {
                position += parse(packet.slice(position))
            }

        }
        return position
    }
}

parse(encodedStr)

console.log(versionSum)