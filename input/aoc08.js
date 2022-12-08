let input = require('fs').readFileSync('input/aoc08.txt','utf8')

let T = input.split`\r\n`.map(e=>[...e].map(e=>+e))
let H = T.length
let W = T[0].length

let p1 = ((f,s) => (
	s = new Set, f = (y,x,p,q,h,i=T[y][x]) => (
	h = i>h ? (s.add( (y<<16) + x), i) : h, y+=p, x+=q,
	(y+1) *	(x+1) * (y<H) * (x<W) ? f(y,x,p,q,h) :0) ,T.
	map((_,i) => f(i,0,0,1,-1) + f(i,W-1,0,-1,-1)), T[0].
	map((_,i) => f(0,i,1,0,-1) + f(H-1,i,-1,0,-1)), s.size))()

let p2 = ((f,s) => (
	f = (y,x,p,q,h) => (y+=p, x+=q, (y+1) * (x+1) * (y<H) * (x<W) ?
	T[y][x]<h ? 1+f(y,x,p,q,h):1:0), s=0, T.map((_,i) => T[i].map((h,j) => (j =
	f(i,j,0,1,h) * f(i,j,0,-1,h) * f(i,j,1,0,h) * f(i,j,-1,0,h), s = j>s?j:s))), s))()

console.log({p1})
console.log({p2})