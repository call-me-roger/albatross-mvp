import React from 'react'
import { PulseLoader } from 'react-spinners'
import { theme } from 'theme'

const { primaryText1 } = theme()

const SimpleLoader = ({ color = primaryText1, size = 7 }) => {
  return <PulseLoader color={color} size={size} />
}

export default SimpleLoader
