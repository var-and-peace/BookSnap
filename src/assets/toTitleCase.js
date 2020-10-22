export default (str) => {
  let newStr = str.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  const lowers = [
    'A',
    'An',
    'The',
    'And',
    'But',
    'Or',
    'For',
    'Nor',
    'As',
    'At',
    'By',
    'For',
    'From',
    'In',
    'Into',
    'Near',
    'Of',
    'On',
    'Onto',
    'To',
    'With',
  ]
  for (let i = 0; i < lowers.length; i++) {
    newStr.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), (txt) => {
      return txt.toLowerCase()
    })
  }

  // Certain words such as initialisms or acronyms should be left uppercase
  const uppers = ['Id', 'Tv']
  for (let i = 0; i < uppers.length; i++) {
    newStr.replace(
      new RegExp('\\b' + uppers[i] + '\\b', 'g'),
      uppers[i].toUpperCase()
    )
  }
  return newStr
}
