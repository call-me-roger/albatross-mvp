import { getPerkByType } from 'contracts/GolfClub'

export function getGameSceneImage(round) {
  const imagesPath = `${process.env.PUBLIC_URL}/images/game`
  const format = 'png'
  let image = ''

  const perk = getPerkByType(round?.bonusPerkType).toLowerCase()
  if (perk === 'long') image = 'long'
  if (perk === 'short') image = 'short'
  if (perk === 'precision') image = 'precision'
  if (perk === 'obstacle') image = 'obstacle'

  return `${imagesPath}/${image}.${format}`
}
