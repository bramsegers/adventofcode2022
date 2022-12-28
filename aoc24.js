let input = require('fs').readFileSync('input/aoc24.txt','utf8')


let gcd = (a,b) => b ? gcd(b,a%b) : a
let lcm = (a,b) => a / gcd(a,b) * b
let key = (r,t,y,x) => (r<<24) | (t<<16) | (y<<8) | x

let M = input.split`\r\n`
let H = M.length-2
let W = M[0].length-2
let L = lcm(H, W)

let f = (n) => {

  let [r,t,y,x] = [0, 0, 0, M[0].indexOf`.`]
  let [P,S,Q,u] = [[[t,y,x]], new Set([key(r,t,y,x)])]

  while (P[0]) {
    Q = [], r++
    for ([t,y,x] of P) {
      for ([y,x] of [[y,x], [y-1,x], [y+1,x], [y,x-1], [y,x+1]]) {
        if (!M[y] || M[y][x]=='#') continue
        if (M[y][(((x+r-1)%W)+W)%W+1]=='<') continue
        if (M[y][(((x-r-1)%W)+W)%W+1]=='>') continue
        if (M[(((y+r-1)%H)+H)%H+1][x]=='^') continue
        if (M[(((y-r-1)%H)+H)%H+1][x]=='v') continue
        if ((u=t+[y>H,y<1][t&1])==n) return r
        if (S.has(key(r%L,u,y,x))) continue
        S.add(key(r%L,u,y,x))
        Q.push([u,y,x])
      }
    }
    P = Q
  }
}

console.log({p1: f(1)})
console.log({p2: f(3)})