import styled from 'styled-components'

export const Title = styled.div`
  height: 100%;
  border-bottom: 1px solid rgb(218, 218, 218);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  span 
  {
    font-size: 16px;
    color: #9C9C9C;
    padding-right: 40px;
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: #ff6c6c;
    height: 20px;
  }
`

export const SeedSelector = styled.div`
  text-align: center;
  max-width: 463px;
  overflow-wrap: anywhere;
  span
  {
    margin: 3px;
    margin-top: 10px;
    background-color: black;
    padding: 3px 10px 3px 10px;
    border-radius: 7px;
    white-space: nowrap;
  }
`

export const Footer = styled.div`
  height: 100%;
  border-top: 1px solid #DADADA;
  display: flex;
  justify-content: center;
  align-items: center;
  span
  {
    color: blue;
  }
`

export const SeedBox = styled.div`
  width: 463px;
  height: 83px;
  background-color: #D8D8D8;
  font-weight: bold; 
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 27px;
  p
  {
    max-width: 350px;
    color: black !important;
    font-weight: bold;
  }
`

export const Box = styled.div`
  background-color: #EFEFF1;
  width: 713px;
  height: 550px;
  margin-top: 20px;
  border-radius: 7px;
  position: relative;
  display: grid;
  grid-template-rows: 87px 2fr 87px;

  p { color: rgb(156, 156, 156); }
  .text 
  {
    max-width: 364px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 40px;
    text-align: center;
  }
  p
  {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  button
  {
    width: 594px;
    height: 59px;
    border: none;
    background: #327BC8;
    border-radius: 25px;
    color: white;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    margin: 10px;
  }
  
  input
  {
    width: 594px;
    height: 59px;
    border: 1px solid #DAD9D9;
    background: none;
    margin: 5px;
    border-radius: 30px;
    font-size: 20px;
    text-align: center;
    outline: none;
  }
  
  footer 
  {
    position: absolute !important;
    bottom: 0px !important;
    width: 100% !important;
    display: flex;
    text-align: center;
    border-top: 1px solid #DADADA;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: blue;
  }
`

export const Loader = styled.div`
  background-color: #D8D8D8;
  width: 594px;
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  border-radius: 30px;
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  div 
  {
    margin-left: 10px;
    height: 35px;
    border-radius: 20px;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: #11162E;
  }
`