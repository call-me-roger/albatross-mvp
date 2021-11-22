import { useState } from 'react'

const useLoading = () => {
  const [isLoading, setLoading] = useState(false)

  function startLoading() {
    setLoading(true)
  }

  function stopLoading() {
    setLoading(false)
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
  }
}

export default useLoading
