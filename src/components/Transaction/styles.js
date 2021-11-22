import { ChevronsRight } from 'react-feather'
import styled from 'styled-components'

export const Row = styled.p`
  position: relative;
  height: 55px;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  margin: 0;
  .cont {
    position: absolute;
    left: 0;
    border: none;
  }
`

export const ArrowIcon = styled(ChevronsRight)`
  polyline {
    color: ${({ theme }) => theme.text3};
  }
`

export const AmountInfo = styled.div`
  display: block;
  color: ${({ theme }) => theme.text1};
  text-align: right;
  font-weight: bold;
  white-space: nowrap;
`

export const FiatValue = styled.div`
  font-size: 11px;
  display: block;
  color: ${({ theme }) => theme.text1};
  font-weight: normal;
  text-align: right;
`

export const TransactionDisplay = styled.div`
  display: flex;
  width: 100%;
  font-size: 11px;
  background-color: ${({ theme }) => theme.bg3};
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }) => theme.bg5};
  }
  justify-content: space-between;
  flex: 0 auto;
  align-items: center;
  margin: 0px;
  cursor: pointer;
  border-radius: 5px;
`

export const Date = styled.div`
  display: flex;
  width: auto;
  padding: ${({ simpleLayout }) => (simpleLayout ? '5px' : '15px')};
  font-size: 11px;
  align-items: center;
  flex-direction: column;
  .day {
    font-size: 22px;
  }
  color: ${({ theme }) => theme.text2};
`

export const ActionIcon = styled.div`
  padding: ${({ simpleLayout }) => (simpleLayout ? '5px' : '15px')};
  width: auto;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 5px;
  `};
`

export const ActionDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: ${({ simpleLayout }) => (simpleLayout ? '0px 5px' : '0px 15px')};
  color: ${({ theme }) => theme.text2};

  .token-detail {
    font-size: 14px;
    margin-bottom: 5;

    ${({ theme }) => theme.mediaWidth.upToMedium`
      font-size: 1em;
    `};
  }

  .address {
    font-size: 11px;
    margin-bottom: 5;

    ${({ theme }) => theme.mediaWidth.upToMedium`
      font-size: 1em;
    `};
  }
`

export const ActionInfo = styled.div`
  color: #7e8995;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  width: auto;
  align-items: center;
`
