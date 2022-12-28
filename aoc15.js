let input = require('fs').readFileSync('input/aoc15.txt','utf8')

let sensors = input.split`\r\n`.map(e=>e.match(/-?\d+/g).map(e=>+e))

let dist = (a,b,c,d) => (a>c?a-c:c-a) + (b>d?b-d:d-b)

let range = () => {
  let rng = () => R, R=[], t
  let red = () => R = R.reduce((r,[a,b]) => ((t=r.at(-1)) && t[1] >= a ? (t[1] = t[1]>b ? t[1] : b): r.push([a,b]), r), [])
  let sub = (a,b) => R = R.reduce((r,[p,q]) => q<=a || b<p ? (r.push([p,q]),r) : (p<a ? r.push([p,a]) : 0, b<q ? r.push([b+1,q]) : 0, r), [])
  let add = (a,b) => (t = R.findIndex(([p,q]) => (p-a || q-b) > 0), R.splice(t+1 ? t : R.length, 0, [a,b+1]), red())
  return {rng, add, sub}
}

let p1 = (y) => {
  let r = range()
  sensors.map(([a,b,c,d]) => (d = dist(a,b,c,d) - dist(a,b,a,y), d < 0 ? 0 : r.add(a-d, a+d)))
  sensors.map(([a,b,c,d]) => (b == y ? r.sub(a,a) : 0, d == y ? r.sub(c,c) : 0))
  return r.rng().reduce((a,[b,c])=>a+c-b,0)
}

let p2 = (x0, x1, y0, y1) => {
  for(let r, y=y0; y<=y1; y++){
    (r=range()).add(x0, x1)
    sensors.map(([a,b,c,d]) => (d = dist(a,b,c,d) - dist(a,b,a,y), d < 0 ? 0 : r.sub(a-d, a+d)))
    if (r=r.rng()[0]) return 4e6 * r[0] + y
  }
}

// console.log( {p1: p1(10)} )
// console.log( {p2: p2(0,20, 0,20)} )

console.log( {p1: p1(2e6)} )
console.log( {p2: p2(0,4e6, 0,4e6)} )