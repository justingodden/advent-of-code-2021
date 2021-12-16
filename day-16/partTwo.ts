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
    let nums: number[] = []

    // literal value type
    if (type === 4) {
        // beginning of first byte's prefix
        position = 6
        let num: string = ''

        // prefix of 1 denotes it is not the last byte
        while (packet[position] === '1') {
            num += packet.slice(position + 1, position + 5)
            // look at next byte's prefix
            position += 5
        }
        num += packet.slice(position + 1, position + 5)
        return [position + 5, parseInt(num, 2)]
    }
    // operator type
    else {
        let lengthType: string = packet[6]

        // I == 0 -> len == 15-bit (number of bin in sub-packet)
        if (lengthType === '0') {
            const subPacketLen: number = parseInt(packet.slice(7, 22), 2)
            position = 0

            while (position < subPacketLen) {
                let res: any = parse(packet.slice(22 + position))
                position += res[0]
                nums.push(res[1])
            }
            position += 22
        }

        // I == 1 -> len == 11-bit (number of subpackets)
        else {
            const numOfSubPackets: number = parseInt(packet.slice(7, 18), 2)
            position = 18

            for (let i = 0; i < numOfSubPackets; i++) {
                let res: any = parse(packet.slice(position))
                position += res[0]
                nums.push(res[1])
            }
        }

        switch (type) {
            // sum
            case 0:
                return [position, nums.reduce((a: number, b: number) => a + b)]
            // product
            case 1:
                return [position, nums.reduce((a: number, b: number) => a * b)]
            // minimum
            case 2:
                return [position, nums.reduce((a: number, b: number) => Math.min(a, b))]
            // maximum
            case 3:
                return [position, nums.reduce((a: number, b: number) => Math.max(a, b))]
            // greater than
            case 5:
                return [position, nums[0] > nums[1] ? 1 : 0]
            // less than
            case 6:
                return [position, nums[0] < nums[1] ? 1 : 0]
            // equal to
            case 7:
                return [position, nums[0] === nums[1] ? 1 : 0]
        }
    }
}

console.log(parse(encodedStr)[1])