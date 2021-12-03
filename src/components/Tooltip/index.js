import React from 'react'
import styled from 'styled-components'

const TooltipBox = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 30px;
  visibility: hidden;
  color: transparent;
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.text1};
  padding: 5px 5px;
  border-radius: 4px;
  font-size: 12px;

  white-space: nowrap;

  &:before {
    content: '';
    width: 0;
    height: 0;
    left: 40px;
    top: -10px;
    position: absolute;

    border: 10px solid transparent;
    transform: rotate(135deg);
    transition: border 0.2s ease-in;
  }
`
const TooltipCard = styled.div`
  position: relative;
  width: 100%;
  &:hover ${TooltipBox} {
    width: auto;
    visibility: visible;
    padding: 8px 8px;
  }
`
export default function Tooltip({ children, overflow, active = true }) {
  return (
    <>
      <TooltipCard>
        {children}
        {active && <TooltipBox>{overflow}</TooltipBox>}
      </TooltipCard>
    </>
  )
}
