function getSummary (value) {
  const lines = String(value)
    .split('\n')

  const result = []
  for (let line of lines) {
    if (line.trim().length > 0) {
      result.push(line)
    }
    if (result.length > 1) {
      break
    }
  }

  return result
    .join('\n\n')
}

module.exports = getSummary
