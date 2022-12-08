let input = require('fs').readFileSync('input/aoc01.txt','utf8')

let calo = input.split`\r\n\r\n`.map(e => e.split`\r\n`.map(e => +e))
let tsum = calo.map(e => e.reduce((a,b) => a+b)).sort((a,b) => b-a)

let p1 = tsum[0]
let p2 = tsum[0]+tsum[1]+tsum[2]

console.log({p1})
console.log({p2})