let input  = require('fs').readFileSync('input/aoc09.txt','utf8')

let dirs   = { U:[-1,0], D:[1,0], L:[0,-1], R:[0,1] }
let moves  = input.split`\r\n`.map(e => [dirs[e[0]], +e.slice(2)])
let follow = (p,q) => p*p*q*q^4 ? [p+1 && p>>1,q+1 && q>>1] : p*p>1 ? [p/2,q] : [p,q/2]

let P = (n) => {
	let S = new Set
	let R = [...Array(n)].map(_ => [0,0])
	for (let [[y,x],k,r,s] of moves) while (k--)
		R = R.map(([p,q],i) => i ? ([r,s]=follow(r-p,s-q), [r+=p,s+=q]) : [r=p+y,s=q+x]),
		S.add(''+R[n-1])
	return S.size
}

console.log({p1: P( 2)})
console.log({p2: P(10)})