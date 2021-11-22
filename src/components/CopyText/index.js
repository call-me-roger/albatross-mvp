import React from 'react'
import styled from 'styled-components/macro'
import { Trans, useTranslation } from 'react-i18next'
import { CheckCircle, Copy, Download } from 'react-feather'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { LinkStyledButton } from '../../theme'

const CopyIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`
const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export function ClickSaveAsJson({ isClicked, textBeforeClick, textAfterClick }) {
  const { t } = useTranslation()

  if (isClicked) {
    return (
      <>
        <CheckCircle size={'16'} mr="5" />
        <span style={{ marginLeft: '4px' }}>{` ${t(textAfterClick)}`}</span>
      </>
    )
  }

  return (
    <>
      <Download size={'16'} /> <span style={{ marginLeft: '4px' }}>{` ${t(textBeforeClick)}`}</span>
    </>
  )
}

export function CopyTransitionText({ isClicked, textBeforeClick, textAfterClick }) {
  const { t } = useTranslation()

  if (isClicked) {
    return (
      <>
        <CheckCircle size={'16'} mr="5" />
        <span style={{ marginLeft: '4px' }}>{` ${t(textAfterClick)}`}</span>
      </>
    )
  }

  return (
    <>
      <Copy size={'16'} /> <span style={{ marginLeft: '4px' }}>{` ${t(textBeforeClick)}`}</span>
    </>
  )
}

export default function CopyHelper(props) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <TransactionStatusText>
            <Trans>Copied</Trans>
          </TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : props.children}
    </CopyIcon>
  )
}
