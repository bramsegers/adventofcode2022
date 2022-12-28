let input = require('fs').readFileSync('input/aoc21.txt','utf8')

let monkeys = () => input.split`\r\n`.map(e=>e.split`: `).reduce((a,[k,v])=>(a[k]=+v||v.split` `,a),{})

let f = (m,n) => {
  for (let k in m) if (m[k].pop)
    m[k] = m[k].map(e=>!m[e] || m[e].pop ? e : m[e]),
    m[k] . some(e=>/[a-z]/.test(e)) ? n = 1 : (
    m[k] = `(${m[k].join``})`,
    m[k] = /\?/.test(m[k]) ? m[k] : eval(m[k]) )
  return n ? f(m) : m
}

let g = (a,b) => {
  if (!(a = a.slice(1,-1))) return b
  let m, v = (m=a.match(/\d+$/)) ? 0 : (m = a.match(/\(/))
  let p = a.slice(0,m=m.index-1), q = '+-*/'.indexOf(a[m]), r = a.slice(m+1)
  return v ? g(r, [b-p, p-b, b/p, p/b][q]) : g(p, [b-r, +r+b, b/r, b*r][q])
}

let p1 = () => {
  let m = monkeys()
  return f(m).root
}

let p2 = () => {
  let m = monkeys()
  let [a,,b] = m.root
  m.humn = '?'
  return g(f(m)[a], f(m)[b])
}

console.log({p1: p1()})
console.log({p2: p2()})