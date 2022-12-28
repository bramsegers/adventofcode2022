let input = require('fs').readFileSync('input/aoc16.txt','utf8')

let scans = input.split`\r\n`.map(e => e.match(/[A-Z]{2}|\d+/g))
let index = scans.sort((a,b) => b[1]-a[1]).reduce((a,e,i) => (a[e[0]]=i,a), {})
let paths = scans.map(e => [+e[1], e.slice(2).map(e => index[e])])

let f = (t) => {
  let key = (v,p) => (v << 8 ) + p
  let D,E = {[key(0,index['AA'])]:0}
  while (t--) {
    [D,E] = [E,{}]
    for(let k in D){
      let val = D[k]
      let pos = k & 255
      let valves = k >> 8
      let [press, path] = paths[pos]
      if (press && !(valves >> pos & 1))
        k = key(valves | 1 << pos, pos),
        E[k] = Math.max(E[k]|0,  t * press + val)
      path.map(p=>E[k = key(valves,p)] = Math.max(E[k]|0, val))
    }
  }
  return Object.entries(D)
}

let p1 = f(30).reduce((a,[k,v]) => v>a ? v : a, 0)
let p2 = 0, t = f(26).reduce((a,[k,v]) => (a[k >>= 8] = a[k]>v ? a[k] : v, a), {})
for (let k1 in t) for (let k2 in t) if (!(k1 & k2)) p2 = Math.max(p2, t[k1] + t[k2])

console.log({p1})
console.log({p2})