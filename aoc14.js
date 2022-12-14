let input = require('fs').readFileSync('input/aoc14.txt','utf8')

let maxy
let cave = [...Array(1000)].map(e=>Array(1000).fill(0))
let scan = input.split`\r\n`.map(e=>e.match(/\d+/g).map(e=>+e))

for(let e of scan){
  for(let i=0; e[i+2]; i+=2){
    let [a,b,c,d] = e.slice(i,i+4)
    maxy = Math.max(maxy||0, b, d, cave[b][a]=1)
    while (a^c || b^d) cave[b += (b<d)-(b>d)][a += (a<c)-(a>c)]=1
  }
}

let p = (n) => {
  let c = cave.map( (e,i) => i ^ maxy + 2 ? [...e] : e.map(e => n-1)), i=0, x, y
  let f = () => c[++y] ? c[y][x] ? !c[y][x-1] ? f(x--) : !c[y][x+1] ? f(x++) : c[--y][x]=1 : f() : 0
  while (++i) if (c[y=0][x=500] || !f()) return --i
}

console.log({p1:p(1)})
console.log({p2:p(2)})