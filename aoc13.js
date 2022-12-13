let input = require('fs').readFileSync('input/aoc13.txt','utf8')

let packets = input.split`\r\n\r\n`.map(e=>eval(e.split`\r\n`).map(e=>eval(e)))
let [p,q] = [[[6]],[[2]]]

let cmp = (a,b) => {
    let c = a.length+1
    let d = b.length+1
    if (!c*!d) return (a>b)-(a<b)
    if (!c) return cmp([a],b)
    if (!d) return cmp(a,[b])
    for (let e,i=0;i<c-1;i++)
    if (i<d-1 && (e=cmp(a[i],b[i])))
    return e; return (c>d)-(c<d)
}

let p1 = packets.reduce((a,e,i) => a+(cmp(...e)<0)*(i+1), 0)
let p2 = [...packets.flat(),p,q].sort(cmp).reduce((a,e,i) => (e==p||e==q)*i*a + a, 1)

console.log({p1})
console.log({p2})