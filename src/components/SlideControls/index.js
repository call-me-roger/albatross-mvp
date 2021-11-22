import React from 'react'
import { Container, Dot } from './styles'
import { withRouter } from 'react-router-dom'

const SlideControls = ({ history }) => {
  return (
    <Container>
      <Dot active={window.location.pathname === `/slide/1`} onClick={() => history.push(`/slide/1`)} />
      <Dot active={window.location.pathname === `/slide/2`} onClick={() => history.push(`/slide/2`)} />
      <Dot active={window.location.pathname === `/slide/3`} onClick={() => history.push(`/slide/3`)} />
      <Dot active={window.location.pathname === `/slide/4`} onClick={() => history.push(`/slide/4`)} />
    </Container>
  )
}

export default withRouter(SlideControls)
