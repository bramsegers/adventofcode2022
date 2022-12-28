let input = require('fs').readFileSync('input/aoc25.txt', 'utf8').split`\r\n`

let decim = (a,b,c) => (c=a.pop()) ? (c=='=' ? -2 : c=='-' ? -1 : +c) * b + decim(a,5*b) : 0
let snafu = (a,b,c) => (b+=a%5, c+=b>2, a-=a%5, a/=5, (a ? snafu(a,c,0) : c ? '=-012'[c+2] : '') + '=-012'[b>2 ? b-3 : b+2])

let p1 = snafu(input.reduce((a,e) => a + decim([...e],1),0),0,0)
console.log({p1})