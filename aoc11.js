let input = require('fs').readFileSync('input/aoc11.txt','utf8')

let monkey = e => ({
  monkeyB : +e.pop(),
  monkeyA : +e.pop(),
  divisor : +e.pop(),
  items   : e.slice(1,-3).map(e => +e),
  next    : n => eval(e.slice(-3).join``.replace(/old/g,n))
})

let monkeys = input.split`\r\n\r\n`.map(e => monkey(e.match(/old|\+|\*|\d+/g)))
let modulo  = monkeys.reduce((a,b) => a * b.divisor, 1)

let P=(rounds, fn) => {
  
  monkeys.map(e => (
    e.it = [...e.items],
    e.inspected = 0
  ))
  
  while (rounds--)
    monkeys.map(m => (
      m.it.map((i,to) => (
        i = fn(m.next(i)),
        to = i % m.divisor ? m.monkeyB : m.monkeyA,
        monkeys[to].it.push(i),
        m.inspected++)), 
      m.it = [])
    )
  
  let insp = monkeys.map(e=>e.inspected)
  return insp.sort((a,b)=>a-b).pop()*insp.pop()
}

let p1 = P(20, n => n / 3 | 0)
let p2 = P(10000, n => n % modulo)

console.log({p1})
console.log({p2})