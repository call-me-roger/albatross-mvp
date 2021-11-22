import styled from 'styled-components'

export const Container = styled.div`
  background-color: #dadfe3;
  color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    height: 59px;
    border: none;
    background: #327bc8;
    border-radius: 30px;
    color: white;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    margin: 10px;
  }
  button:disabled {
    opacity: 0.3;
  }
`

export const Header = styled.div`
  height: 85px;
  display: flex;
  background-color: rgb(17, 22, 46);
  width: 100vw;
  flex-direction: row;
  justify-content: space-between;
  div {
    padding-right: 60px;
    padding-left: 60px;
    display: flex;
    align-items: center;
  }
`

export const Menu = styled.div`
  height: 82px;
  width: 100vw;
  background-color: white;
  box-shadow: 0px 0px 7px black;
  display: flex;
  flex-direction: row;
  line-height: 82px;
  span:first-child {
    margin-left: 60px;
  }
  span {
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
    margin-left: 30px;
    color: #7e8995;
    font-size: 18px;
    font-weight: 500;
    height: 100%;
    transition: font-weight 1s;
  }
  span:hover {
    font-weight: bold;
  }
  span > svg {
    margin-right: 10px;
  }
`
