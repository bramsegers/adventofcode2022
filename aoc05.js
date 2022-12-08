let inputs = require('fs').readFileSync('input/aoc05.txt','utf8').split`\r\n\r\n`

let piles = inputs[0].split`\r\n`
let width = Array(+piles.pop().split`  `.pop())
let moves = inputs[1].split`\r\n`.map(e => e.match(/\d+/g).map((e,i) => e-!!i))

let fn = (e,i) => piles.reduce((a,b) => (e=b[4*i+1], e==' ' ? a : [e,...a]),[])
let pt = (f,p) => (p=[...width].map(fn),moves.map(f(p)),p.map(e=>e.pop()).join``)

let p1 = pt(p => ([a,b,c]) => [...Array(a)].map( _ => p[c].push(p[b].pop())))
let p2 = pt(p => ([a,b,c]) => (p[c].push(...p[b].slice(-a)), p[b].length-=a))

console.log({p1})
console.log({p2})