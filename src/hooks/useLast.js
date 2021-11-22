import { useEffect, useState } from 'react'

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
export default function useLast(value = null, filterFn = null) {
  const [last, setLast] = useState(filterFn && filterFn(value) ? value : undefined)
  useEffect(() => {
    setLast(last => {
      const shouldUse = filterFn ? filterFn(value) : true
      if (shouldUse) return value
      return last
    })
  }, [filterFn, value])
  return last
}

function isDefined(x = null) {
  return x !== null && x !== undefined
}

/**
 * Returns the last truthy value of type T
 * @param value changing value
 */
export function useLastTruthy(value = null) {
  return useLast(value, isDefined)
}
