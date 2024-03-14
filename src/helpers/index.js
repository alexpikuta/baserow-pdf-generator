// Wrap each word into <span> element for further calculations
export const wrapWords = (element) => {
  return element.innerText
    .split(/\s/)
    .map((word) => `<span>${word}</span>`)
    .join(' ')
}

// Convert element's text into array of string with saving lines position
export const getLines = (element) => {
  const words = Array.from(element.getElementsByTagName('span'))
  const lines = []
  let lastTop = 0

  for (const word of words) {
    // If word on the same line as previous, push it there
    if (word.offsetTop === lastTop) {
      lines[lines.length - 1] = lines[lines.length - 1].concat(` ${word.innerText}`)
      continue
    }

    lastTop = word.offsetTop
    lines.push(word.innerText)
  }

  return lines.join('\n')
}
