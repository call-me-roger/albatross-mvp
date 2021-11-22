import styled from 'styled-components'


export const Box  = styled.div`
  width: 100%;
  min-width: 443px;
  background-color: white;
  min-height: 548px;
  margin: 15px;
  border-radius: 7px;
  display: grid;
  grid-template-rows: 51px 2fr 51px;
  div:first-child 
  { 
    border-bottom: 1px solid #E7E7E7; 
    color: #7E8995;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 16px;
  }
  div:last-child
  {
    border-top: 1px solid #E7E7E7;
    color: #566270;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button
  {
    width: 401px;
  }
`