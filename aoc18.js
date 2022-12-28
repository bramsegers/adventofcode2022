let input   = require('fs').readFileSync('input/aoc18.txt','utf8')

let scan    = input.split`\r\n`.map(e => e.split`,`.map(e=>+e))
let lava    = scan.reduce((a,e) => (a[e]=1, a), {})
let [X,Y,Z] = scan.reduce(([X,Y,Z],[x,y,z]) => [X=x>X?x:X, Y=y>Y?y:Y, Z=z>Z?z:Z])

let v = (x,y,z) => lava[[x,y,z]]|0
let f = (x,y,z) => v(x-1,y,z) + v(x+1,y,z) + v(x,y+1,z) + v(x,y-1,z) + v(x,y,z+1) + v(x,y,z-1)
let g = (x,y,z) => x<0 || y<0 || z<0 || x>X || y>Y || z>Z || lava[[x,y,z]] ? 0 : (lava[[x,y,z]]=2, g(x-1,y,z), g(x+1,y,z), g(x,y-1,z), g(x,y+1,z), g(x,y,z-1), g(x,y,z+1))

let p1 = scan.reduce((a,[x,y,z]) => a + 6 - f(x,y,z), 0)
let p2 = p1

g(0,0,0)
for (let x=0;x<=X;x++)
  for (let y=0;y<=Y;y++)
    for (let z=0;z<=Z;z++)
      p2 -= lava[[x,y,z]] ? 0 : f(x,y,z)

console.log({p1})
console.log({p2})