import React from 'react'
import { useLocalState } from 'store/local/state'
import DoricLogoBlack from './DoricLogoBlack'
import DoricLogoWhite from './DoricLogoWhite'

const DoricLogo = () => {
  const { isDarkMode } = useLocalState()
  return isDarkMode ? <DoricLogoWhite /> : <DoricLogoBlack />
}

export const DoricLogoIcon = props => {
  const { isDarkMode } = useLocalState()
  return (
    <svg
      style={{ borderRadius: 17 }}
      width="32px"
      height="31px"
      viewBox="0 0 32 31"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="doric-avatar"
          transform="translate(-3.000000, -2.000000)"
          fillRule="nonzero"
          fill={isDarkMode ? '#fff' : '#0B1725'}
        >
          <g id="D---Doric" transform="translate(3.000000, 1.000000)">
            <g transform="translate(-1.000000, 1.000000)" id="Shape">
              <path d="M18.75,0.29 L1.22,0.29 C0.89,0.29 0.62,0.56 0.62,0.89 L0.62,29.88 C0.62,30.21 0.89,30.48 1.22,30.48 L18.74,30.48 C27.06,30.48 33.83,23.71 33.83,15.39 C33.83,7.07 27.07,0.29 18.75,0.29 Z M32.38,12.7 C31.16,7.54 26.53,3.68 21,3.68 L1.82,3.68 L1.82,2.58 C1.82,1.98 2.31,1.48 2.92,1.48 L18.75,1.48 C25.49,1.49 31.12,6.32 32.38,12.7 Z M1.82,25.89 L1.82,24.79 C1.82,24.19 2.31,23.69 2.92,23.69 L23.3,23.69 C26.89,23.69 29.94,21.4 31.11,18.21 C29.87,22.63 25.81,25.88 21,25.88 L1.82,25.88 L1.82,25.89 Z M21,4.88 C25.81,4.88 29.87,8.13 31.11,12.55 C29.95,9.36 26.89,7.07 23.3,7.07 L1.82,7.07 L1.82,5.97 C1.82,5.37 2.31,4.87 2.92,4.87 L21,4.87 L21,4.88 Z M8.78,22.5 C8.34,22.5 7.98,22.14 7.98,21.7 L7.98,9.06 C7.98,8.62 8.34,8.26 8.78,8.26 L23.3,8.26 C27.22,8.26 30.42,11.45 30.42,15.38 C30.42,19.3 27.23,22.5 23.3,22.5 L8.78,22.5 Z M4.9,22.5 L4.9,8.97 C4.9,8.95 4.91,8.93 4.91,8.91 C4.91,8.56 5.2,8.27 5.55,8.27 L6.78,8.27 L6.78,21.87 C6.78,22.22 6.49,22.51 6.14,22.51 L4.9,22.51 L4.9,22.5 Z M1.82,8.95 C1.82,8.94 1.83,8.92 1.83,8.91 C1.83,8.56 2.12,8.27 2.47,8.27 L3.71,8.27 L3.71,21.85 C3.71,21.86 3.71,21.86 3.71,21.87 C3.71,22.22 3.42,22.51 3.07,22.51 L1.82,22.51 L1.82,8.95 Z M18.75,29.28 L1.82,29.28 L1.82,28.18 C1.82,27.58 2.31,27.08 2.92,27.08 L21,27.08 C26.53,27.08 31.16,23.22 32.38,18.06 C31.12,24.45 25.49,29.28 18.75,29.28 Z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default DoricLogo
