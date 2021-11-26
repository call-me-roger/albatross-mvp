export const ruleOfThree = (
  base,
  compareValue,
  basePercetage = 100,
  patternNull = 0,
  invertedBase = false,
) => {
  const realBase = !invertedBase ? base : compareValue
  const realCompare = !invertedBase ? compareValue : base

  const multiply = parseFloat(realCompare) * parseFloat(basePercetage)

  let x = multiply / parseFloat(realBase)

  x = isFinite(x) ? x : patternNull

  return x
}
