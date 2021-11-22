import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0px;
`

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #000000;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      background-color: #bdbdbd;
    `}
`
