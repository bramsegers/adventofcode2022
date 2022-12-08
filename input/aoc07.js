let input = require('fs').readFileSync('input/aoc07.txt','utf8')
let commd = input.split('\r\n$').slice(1).map(e=>e.split`\r\n`)
let [root, ls, dir] = ['..', 'ls', 'dir']


let node = p => ({files:{}, dirs:{[root]:p}})
let list = (n,c) => n.map((a,b) => ([a,b]=a.split` `, a==dir ? c.dirs[b]=node(c) : c.files[b]=+a))
let fill = (n,c) => (c=n, commd.map((s,t) => (t=s.shift().split` `.pop())==ls ? list(s,c) : c=c.dirs[t]), n)

let drive = fill(node())


let size = {}
let dfs = (s,n)=> size[s]
	= Object.values(n.files).reduce( (a,b) => a+b, 0 )
	+ Object.entries(n.dirs).reduce( (a,[k,v]) => k==root ? a : a + dfs(s + k, v) ,0)

dfs(root, drive)


let p1 = Object.values(size).reduce((a,b) => b>1e5 ? a : a + b, 0)
let p2 = Object.values(size).reduce((a,b) => b<size[root]-4e7 || b>a ? a : b, size[root])

console.log({p1})
console.log({p2})