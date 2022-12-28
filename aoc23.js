let input = require('fs').readFileSync('input/aoc23.txt', 'utf8').split`\r\n`


let elves =
  [...Array(150)].map((_,y) =>
  [...Array(150)].map((_,x) =>
  +((input[y-20]||[])[x-20] == '#')))


let dirs = [
  [ [-1, 0], [-1,-1], [-1, 1] ],  //  N, NW, NE
  [ [ 1, 0], [ 1, 1], [ 1,-1] ],  //  S, SE, SW
  [ [ 0,-1], [-1,-1], [ 1,-1] ],  //  W, NW, SW
  [ [ 0, 1], [-1, 1], [ 1, 1] ],  //  E, NE, SE
]


for (let M=[], R=1; M; R++) {

  elves.map((r,y) => r.map((v,x) => v ? (
    v = dirs.map(e => e.filter(([p,q]) => !elves[p+y][q+x])),
    v.some(e => !e[2]) ? ((v=v.find(e => e[2])) ? (v=[v[0][0]+y, v[0][1]+x],
    M[v]=M[v] || [v], M[v].push([y,x])) : 0 ) : 0 ) : 0
  ))

  M = Object.values(M).filter(e => !e[2])
  M.map(([[a,b],[c,d]]) => (elves[a][b]=1, elves[c][d]=0))

  if (R==10) {
    let a=150, b=150, c=0, d=0, e=0, f = (y,x) => 
    (a=x<a?x:a, b=y<b?y:b, c=x>c?x:c, d=y>d?y:d, e++)
    elves.map((r,y) => r.map((v,x) => v && f(y,x)))
    console.log({p1: (d-b+1)*(c-a+1)-e})
  }

  dirs = [...dirs.slice(1), dirs[0]]
  M = M[0] ? [] : console.log({p2: R}) 

}