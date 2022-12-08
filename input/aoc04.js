let input = require('fs').readFileSync('input/aoc04.txt','utf8')

let pairs = input.split`\r\n`.map(e=>e.match(/\d+/g).map(e=>+e))
let ovrlp = (a,b,c,d) => a<=b && c<=d

let p1 = pairs.reduce((s,[a,b,c,d]) => s + (ovrlp(c,a,b,d) | ovrlp(a,c,d,b)), 0)
let p2 = pairs.reduce((s,[a,b,c,d]) => s + (ovrlp(a,c,c,b) | ovrlp(a,d,d,b) | ovrlp(c,a,a,d) | ovrlp(c,b,b,d)), 0)

console.log({p1})
console.log({p2})