let input = require('fs').readFileSync('input/aoc17.txt','utf8')

let rocks = [
  [ 0b11110, 0b00000, 0b00000, 0b00000 ],
  [ 0b01000, 0b11100, 0b01000, 0b00000 ],
  [ 0b11100, 0b00100, 0b00100, 0b00000 ],
  [ 0b10000, 0b10000, 0b10000, 0b10000 ],
  [ 0b11000, 0b11000, 0b00000, 0b00000 ]
]

let f = (R) => {

  let h1   = 0
  let h2   = 0
  let jeti = 0
  let roci = 0
  let seen = { }
  let cave = [ 0b1111111 ]
  let fits = (a,b) => !a.some((e,i) => e&b[i])
  
  for (let r=1; r<=R; r++) {
    
    let y, rock = [...rocks[roci]]
    roci = ++roci % rocks.length
    while (cave[h1-6]!==0) cave.push(0), h1++ 
    
    for (y=h1;;) {
      let r2 = input[jeti] == '<' 
        ? rock.every(e => !(e>>6)) ? rock.map(e => e<<1) : rock 
        : rock.every(e => !(e &1)) ? rock.map(e => e>>1) : rock   
      jeti = ++jeti % input.length
      if (fits(r2, cave.slice(y-3,y+1))) rock=r2
      if (fits(rock, cave.slice(y-4,y))) y--; else break
    }
    
    rock.map((e,i) => cave[y-3+i]|=e)
    while (!cave[h1]) cave.pop(), h1--
    
    let key = [roci, jeti, ...cave.slice(-20)].join`,`
    if (!seen[key]) {seen[key]=[h1,r]; continue}
    let [h0,r0] = seen[key]
    let [p,q] = [R-r, r-r0]
    r += p-= p % q
    h2 += (p/q) * (h1-h0)
  }

  return h1 + h2  
}

console.log({ p1: f(2022)})
console.log({ p2: f(1e12)})