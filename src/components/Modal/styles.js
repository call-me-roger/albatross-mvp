import styled from 'styled-components'

export const Glass = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: black;
  top: 0;
  left: 0;
  border: 0;
  right: 0;
  z-index: 1;
  opacity: 0.35;
`

export const Content = styled.div`
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  border: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`