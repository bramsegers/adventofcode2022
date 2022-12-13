let input = require('fs').readFileSync('input/aoc12.txt','utf8').split`\r\n`

let S,E,M = input.map((e,i) => [...e].map((e,j) => e=='S' ? (S=[i,j],0) : e=='E' ? (E=[i,j],25) : e.charCodeAt()-97))

let bfs = (y,x) => {
 
  let N = [[y,x,0]]
  let K = (a,b) => (a<<10)+b
  let V = [],n,p,q; V[K(y,x)] = 1
 
  for ([y,x,n] of N)
    if (K(y,x) == K(...E)) return n; else
    for ([p,q] of [[y-1,x],[y+1,x],[y,x-1],[y,x+1]])
    if (M[p] && M[p][q]-M[y][x]<2 && !V[K(p,q)]) N.push([p,q,n+(V[K(p,q)]=1)])
  
  return 1e9
}

let p1 = bfs(...S)
let p2 = (m => (M.map((e,i) => e.map((n,j) => n ? 0 : (n=bfs(i,j), m = n<m || !m ? n : m))), m))()

console.log({p1})
console.log({p2})