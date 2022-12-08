let input = require('fs').readFileSync('input/aoc06.txt','utf8')

let index = n => [...input].findIndex((_,i) => new Set(input.slice(i-n,i)).size == n)

console.log( {p1: index( 4)} )
console.log( {p2: index(14)} )