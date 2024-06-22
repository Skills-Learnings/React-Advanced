export function sum(a, b) {
  return a + b
}

export function delayedFunc(cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb(2))
    }, 1000)
  })
}
