import * as React from 'react'

function Withdrawn(props) {
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
          stroke="#f08888"
          strokeWidth={2}
          transform="translate(1 1)"
        />
        <path d="M9 8.003h16v16H9z" />
        <path
          d="M16.333 12.277v6.39h1.334v-6.39l2.195 2.195.943-.943L17 9.725l-3.805 3.804.943.943zM21 20v1.334h-8v-1.333h-1.333v1.333c0 .735.597 1.333 1.333 1.333h8c.736 0 1.333-.598 1.333-1.333v-1.333H21z"
          fill="#f08888"
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

export default Withdrawn
