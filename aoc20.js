let input = require('fs').readFileSync('input/aoc20.txt','utf8')

let p = (rounds, mul) => {

  let n = input.split`\r\n`.map(e=>({val: e * mul})), k=n.length-1
  n.map((e,i) => (e.prv = n[i ? i-1 : k], e.nxt = n[i<k ? i+1 : 0]))

  while (rounds--) n.map(a => {
    let b,c,d,v = (a.val % k + k) % k
    while (v--) b=a.prv, c=a.nxt, d=c.nxt, a.prv=c, a.nxt=d, b.nxt=c, c.prv=b, c.nxt=a, d.prv=a
  })

  k = 0
  n = n.find(e => !e.val)
  for(let i=3; i--; k += n.val)
    for(let j=1000; j--;) n = n.nxt
  return k

}

console.log({p1: p(1, 1)})
console.log({p2: p(10, 811589153)})