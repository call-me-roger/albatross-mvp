import React from 'react'
import { isMobile } from 'react-device-detect'
import { animated } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { transparentize } from 'polished'
import styled, { css } from 'styled-components'
import Close from '../SVG/CloseIcon'

const AnimatedDialogOverlay = animated(DialogOverlay)
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
      0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`

const AnimatedDialogContent = animated(DialogContent)

const StyledDialogContent = styled(
  // eslint-disable-next-line
  ({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
    <AnimatedDialogContent {...rest} />
  ),
).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: ${({ theme }) => theme.bg1};
    border: 1px solid ${({ theme }) => theme.bg1};
    box-shadow: 0 4px 8px 0
      ${({ theme }) => transparentize(0.95, theme.shadow1)};
    padding: 15px 20px;
    overflow-y: auto;
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 420px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 65vw;
      margin: 0;
    `}
    ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
      width:  85vw;
      ${mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `}
    `}
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  z-index: 100;
`

export default function Modal({
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children,
}) {
  return (
    <StyledDialogOverlay
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      unstable_lockFocusAcrossFrames={false}
    >
      <div style={{ position: 'relative' }}>
        <CloseIcon onClick={onDismiss}>
          <CloseColor height="15" width="15" />
        </CloseIcon>
        <StyledDialogContent
          aria-label="dialog content"
          minHeight={minHeight}
          maxHeight={maxHeight}
          mobile={isMobile}
        >
          {children}
        </StyledDialogContent>
      </div>
    </StyledDialogOverlay>
  )
}
