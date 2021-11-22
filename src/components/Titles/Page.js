import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { RowBetween } from 'components/Row'

export const TitleRow = styled(RowBetween)`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`

const PageTitle = ({ children }) => {
  return (
    <TitleRow padding={'0'}>
      <TYPE.largeHeader>{children}</TYPE.largeHeader>
    </TitleRow>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageTitle
