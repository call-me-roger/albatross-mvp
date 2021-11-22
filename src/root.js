import 'inter-ui'
import React from 'react'
import './i18n'
import App from './pages/App'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import { useLocalState } from 'store/local/state'

const Root = () => {
  const { isDarkMode } = useLocalState()

  return (
    <>
      <FixedGlobalStyle />
      <ThemeProvider darkMode={isDarkMode}>
        <ThemedGlobalStyle />
        <App />
      </ThemeProvider>
    </>
  )
}

export default Root
