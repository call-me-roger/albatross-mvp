import { useState } from 'react'

const useLoading = () => {
  const [isLoading, setLoading] = useState(false)
  const [neverLoaded, setNeverLoaded] = useState(true)

  function startLoading() {
    setLoading(true)
  }

  function stopLoading() {
    setLoading(false)
    setNeverLoaded(false)
  }

  function suspense(notLoadingJSX, loadingJSX) {
    return isLoading ? loadingJSX : notLoadingJSX
  }

  return {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    suspense,
    neverLoaded,
  }
}

export default useLoading
