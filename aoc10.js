let input = require('fs').readFileSync('input/aoc10.txt','utf8')

let i = 0
let x = 1
let p1 = 0
let p2 = Array(6).fill``
let instr = input.split`\r\n`

let f = i => (p1 += (i%40==20) * i * x, p2[(--i/40)|0] += (i%40-x)**2 < 2 ? '#' : ' ')
instr.map(s => (f(++i), /add/.test(s) ? (f(++i), x+=+s.split` `[1]) : 0))

console.log(p1)
console.log(p2.join`\n`)