let input = require('fs').readFileSync('input/aoc22.txt', 'utf8').split`\r\n\r\n`

let map   = input[0].split`\r\n`
let path  = input[1].match(/\d+|./g)

let H = map.length
let W = Math.max(...map.map(e=>e.length))
let M = map.map(e => e.padEnd(W,' '))

// direcions:
//   0 = R >
//   1 = D v
//   2 = L <
//   3 = U ^

// grid layout:
//   . A B
//   . C .
//   D E .
//   F . .

let move2D = (y,x,d) => {
  y = (y + [0,1,0,-1][d] + H) % H
  x = (x + [1,0,-1,0][d] + W) % W
  return M[y][x] > ' ' ? [y,x,d] : move2D(y,x,d)
}

let move3D = (y,x,d) => {
  if (d==0 && x==149 && y>=  0 && y< 50) return [149-y,    99, 2]
  if (d==0 && x== 99 && y>= 50 && y<100) return [   49,  50+y, 3]
  if (d==0 && x== 99 && y>=100 && y<150) return [149-y,   149, 2]
  if (d==0 && x== 49 && y>=150 && y<200) return [  149, y-100, 3]
  if (d==1 && y== 49 && x>=100 && x<150) return [x- 50,    99, 2]
  if (d==1 && y==149 && x>= 50 && x<100) return [x+100,    49, 2]
  if (d==1 && y==199 && x>=  0 && x< 50) return [    0, x+100, 1]
  if (d==2 && x== 50 && y>=  0 && y< 50) return [149-y,     0, 0]
  if (d==2 && x== 50 && y>= 50 && y<100) return [100  ,  y-50, 1]
  if (d==2 && x==  0 && y>=100 && y<150) return [149-y,    50, 0]
  if (d==2 && x==  0 && y>=150 && y<200) return [    0, y-100, 1]
  if (d==3 && y==100 && x>=  0 && x< 50) return [x+ 50,    50, 0]
  if (d==3 && y==  0 && x>= 50 && x<100) return [x+100,     0, 0]
  if (d==3 && y==  0 && x>=100 && x<150) return [  199, x-100, 3]
  return move2D(y,x,d)
}

let walk = (move) => {
  let [y,x,d] = [0,50,0]
  for (let c of path) {
    if (c=='R') d = (d+1)&3; else
    if (c=='L') d = (d+3)&3; else
    while (c--) {
      let [y2,x2,d2] = move(y,x,d)
      if (M[y2][x2]=='#') break
      [y,x,d] = [y2,x2,d2]
    }
  }
  return 1000 * (y+1) + 4 * (x+1) + d
}

console.log({p1: walk(move2D)})
console.log({p2: walk(move3D)})