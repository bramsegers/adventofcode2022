let input = require('fs').readFileSync('input/aoc02.txt','utf8')

let dict = { A:0,B:1,C:2,X:0,Y:1,Z:2 }
let game = input.split`\r\n`.map(([a,_,b]) => [dict[a],dict[b]])

let P1 = (a,b) => +'120012201'[3*a+b]
let P2 = (a,b) => +'201012120'[3*a+b]

let p1 = game.reduce((t,[a,b]) => t+3*P1(a,b)+b+1, 0)
let p2 = game.reduce((t,[a,b]) => t+3*b+P2(a,b)+1, 0)

console.log({p1})
console.log({p2})