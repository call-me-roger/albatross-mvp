import styled from 'styled-components'

export const Container = styled.div`
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  button:disabled {
    opacity: 0.3;
  }
`
