import { AutoColumn } from 'components/Column'
import styled from 'styled-components'

export const Box = styled.div`
  min-width: 443px;
  background-color: white;
  min-height: 548px;
  margin: 15px;
  border-radius: 7px;
  display: grid;
  grid-template-rows: 51px 2fr 51px;
  div:first-child {
    border-bottom: 1px solid #e7e7e7;
    color: #7e8995;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 16px;
  }
  div:last-child {
    border-top: 1px solid #e7e7e7;
    color: #566270;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 401px;
  }
`

export const SimpleGrid = styled(AutoColumn)`
  grid-template-columns: ${({ template }) => template || '1fr'};
  gap: 12px;
  justify-content: space-between;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 8px;
    grid-template-columns: 1fr;
  `};
`
