export function getImageBySymbol(symbol) {
  const imagesPath = `${process.env.PUBLIC_URL}/images`
  const ucSymbol = symbol?.toUpperCase()

  if (ucSymbol === 'DRC') return `${imagesPath}/DRC.png`

  const format = 'png'
  const tokensPath = `${imagesPath}/tokens`

  return `${tokensPath}/${ucSymbol}.${format}`
}
