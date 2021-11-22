import React, { StrictMode } from 'react'
import ReactGA from 'react-ga'
import ReactDOM from 'react-dom'
import Root from './root'

window.addEventListener('error', error => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true,
  })
})

ReactDOM.render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById('root'),
)
