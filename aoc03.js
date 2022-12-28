let input = require('fs').readFileSync('input/aoc03.txt','utf8')

let sack = input.split`\r\n`
let ordn = c => c.charCodeAt() - (c<'a'?38:96)

let P1 = s => ordn([...s].find(c => s.slice(-s.length/2).includes(c)))
let P2 = i => ordn([...sack[i]].find(c => sack[i+1].includes(c)*sack[i+2].includes(c)))

let p1 = sack.reduce((a,b) => a+P1(b), 0)
let p2 = sack.slice(0,sack.length/3).reduce((a,_,i) => a+P2(3*i), 0)

console.log({p1})
console.log({p2})