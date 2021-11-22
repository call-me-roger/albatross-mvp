import styled from 'styled-components'

export const Box = styled.div`
  min-height: 548px;
  margin: 15px;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 51px 2fr 51px;
  div:first-child {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  div:last-child {
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
