import styled from 'styled-components'

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #11162e;
  color: white;
  height: 100vh;
  width: 100vw;

  .logo {
    text-align: center;
  }

  button:disabled {
    opacity: 0.35;
  }

  p {
    font-size: 16px;
  }
`

export const Container = styled.div`
  background-color: #22273d;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;
  min-width: 380px !important;

  .text2 {
    color: #e9e9eb;
    font-size: 16px;
  }

  button {
    width: 200px;
    height: 30px;
    border: none;
    background: #327bc8;
    border-radius: 6px;
    color: white;
    font-size: 16px;
    outline: none;
    cursor: pointer;
  }

  input {
    width: 300px;
    height: 40px;
    border: 1px solid #dad9d9;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
    outline: none;
    background-color: white;
  }
`
