export function wait(data, duration) {
  return new Promise(res => {
    setTimeout(() => {
      res(data)
    }, duration)
  })
}