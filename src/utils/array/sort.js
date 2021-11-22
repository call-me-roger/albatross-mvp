export function shuffleArray(array) {
  const shuffed = array

  for (let i = shuffed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffed[i]
    shuffed[i] = shuffed[j]
    shuffed[j] = temp
  }

  return shuffed
}

export const orderArrayByObjAttr = (
  array,
  attrSlug,
  subAttrSlug = false,
  onlyNumbers = false,
) => {
  const transform = attr => {
    return onlyNumbers ? Number(attr) : attr.toUpperCase()
  }

  if (array && array.length > 0) {
    if (attrSlug && !subAttrSlug) {
      return array.sort((a, b) => {
        if (a[attrSlug] && b[attrSlug]) {
          const a_attr = transform(a[attrSlug])
          const b_attr = transform(b[attrSlug])

          return a_attr > b_attr ? 1 : b_attr > a_attr ? -1 : 0
        }
        return a[attrSlug] ? 1 : b[attrSlug] ? -1 : 0
      })
    }
    if (attrSlug && subAttrSlug) {
      return array.sort((a, b) => {
        if (a[attrSlug][subAttrSlug] && b[attrSlug][subAttrSlug]) {
          const a_attr = transform(a[attrSlug][subAttrSlug])
          const b_attr = transform(b[attrSlug][subAttrSlug])

          return a_attr > b_attr ? 1 : b_attr > a_attr ? -1 : 0
        }
        return a[attrSlug][subAttrSlug] ? 1 : b[attrSlug][subAttrSlug] ? -1 : 0
      })
    }
  }

  return array
}
