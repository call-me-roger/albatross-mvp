import { getPerkByType } from 'contracts/GolfClub'

export function getGameSceneImage(round) {
  const imagesPath = `${process.env.PUBLIC_URL}/images/game`
  const format = 'png'
  let image = ''

  const perk = getPerkByType(100).toLowerCase()
  if (perk === 'long') image = 'long'
  if (perk === 'short') image = 'short'
  if (perk === 'precision') image = 'precision'
  if (perk === 'obstacle') image = 'obstacle'

  return `${imagesPath}/${image}.${format}`
}

export function getGameResultImage(result) {
  const imagesPath = `${process.env.PUBLIC_URL}/images/game`
  const format = 'gif'
  let image = ''

  if (result === 'win') image = 'you-win'
  if (result === 'loss') image = 'you-missed'

  return `${imagesPath}/${image}.${format}`
}
