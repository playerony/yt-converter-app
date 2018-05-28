function getLinesOfText(text) {
  let result = []
  let currentLine = ''
  let numberOfLettersInLine = 19

  for(let i=1 ; i<=text.length ; i++) {
    currentLine += text[i - 1]

    if(i % numberOfLettersInLine === 0) {
      result.push(currentLine)
      currentLine = ''
    }
  }

  if(currentLine.length > 0)
    result.push(currentLine)

  return result
}

export default getLinesOfText