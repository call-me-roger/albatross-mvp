import * as React from 'react'

function Deposit(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={34}
      height={34}
      viewBox="0 0 34 34"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <circle
          cx={16}
          cy={16}
          r={16}
          stroke="#96be8c"
          strokeWidth={2}
          transform="translate(1 1)"
        />
        <path d="M9 9.003h16v16.32H9z" />
        <path
          d="M20.805 16.281l-.943-.961-2.195 2.24v-7.2h-1.334v7.2l-2.195-2.24-.943.961L17 20.162zM21 21.24v1.36h-8v-1.36h-1.333v1.36c0 .75.597 1.36 1.333 1.36h8c.736 0 1.333-.61 1.333-1.36v-1.36H21z"
          fill="#96be8c"
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

export default Deposit
