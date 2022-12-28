let input = require('fs').readFileSync('input/aoc19.txt','utf8')

let blueprints = input.split`\r\n`.map(e=>e.match(/\d+/g).map(e=>+e))

let dfs = (M,B,T,G, p,q,r,s, a,b,c,d) => {

  let m = max(B[1], B[2], B[3], B[6]), g
  let u = (a<<24) | (b<<16) | (c<<8) | d
  let v = (p<<24) | (q<<20) | (r<<16) | (s<<12) | (T<<4) | G

  if (T==0) return d
  if (G==0 && a>=m) return 0
  if (G==2 && b==0) return 0
  if (G==3 && c==0) return 0
  if (G==1 && b>=B[4]) return 0
  if (G==2 && c>=B[6]) return 0
  if (M[u] && M[u][v]) return M[u][v]

  for (m=0; T--; a+=p, b+=q, c+=r, d+=s, m=max(m,d)) {
    if (G==0 && a>=B[1])            { for (g=4;g--;) m=max(m, dfs(M,B,T,g, p+1,q,r,s, a+p-B[1], b+q     , c+r     , d+s)); T=0 }
    if (G==1 && a>=B[2])            { for (g=4;g--;) m=max(m, dfs(M,B,T,g, p,q+1,r,s, a+p-B[2], b+q     , c+r     , d+s)); T=0 }
    if (G==2 && a>=B[3] && b>=B[4]) { for (g=4;g--;) m=max(m, dfs(M,B,T,g, p,q,r+1,s, a+p-B[3], b+q-B[4], c+r     , d+s)); T=0 }
    if (G==3 && a>=B[5] && c>=B[6]) { for (g=4;g--;) m=max(m, dfs(M,B,T,g, p,q,r,s+1, a+p-B[5], b+q     , c+r-B[6], d+s)); T=0 }
  }

  return (M[u]=M[u]||[])[v]=m
}

let max = Math.max
let max_geo = (b,t,m=[]) => max(...[0,1,2,3].map(g => dfs(m,b,t,g, 1,0,0,0, 0,0,0,0)))

let p1 = blueprints.reduce((a,b) => a + b[0] * max_geo(b,24), 0)
let p2 = blueprints.slice(0,3).reduce((a,b) => a * max_geo(b,32), 1)

console.log({p1})
console.log({p2})