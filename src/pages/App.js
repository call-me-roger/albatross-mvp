import React, { Suspense, useEffect } from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import styled from 'styled-components'
import ModalProvider from 'components/ModalProvider'
import { AutoColumn } from 'components/Column'
import ProtectedRoute from 'components/ProtectedRoute'
import { routes } from './routes'
import { provider } from 'constants/provider'
import { useAccountState } from '../store/account/state'
import Header from 'components/Header'
import { ethers } from 'ethers'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5rem 1rem;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 5rem 1rem;
  `};
`

const PageWrapper = styled(AutoColumn)`
  max-width: 870px;
  width: 100%;
  justify-items: center;
  padding: ${({ padding }) => padding};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

function App() {
  const { setLogged, setAddress, setBalance } = useAccountState()

  useEffect(() => {
    async function start() {
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const newAddress = await signer.getAddress()
      if (newAddress) {
        const newBalance = await provider.getBalance(newAddress)
        console.log('Account:', newAddress)
        setLogged(true)
        setAddress(newAddress)
        setBalance(ethers.utils.formatEther(newBalance))
      }
    }

    start()
    // eslint-disable-next-line
  }, [])

  return (
    <Suspense fallback={null}>
      <Router>
        <AppWrapper>
          <ModalProvider />

          <HeaderWrapper>
            <Header />
          </HeaderWrapper>

          <BodyWrapper gap="lg" justify="center">
            <PageWrapper>
              <Switch>
                {routes.map(({ path, component, authRequired, exact }) => {
                  return (
                    <ProtectedRoute
                      key={path}
                      path={path}
                      component={component}
                      authRequired={authRequired}
                      exact={exact}
                    />
                  )
                })}
              </Switch>
            </PageWrapper>
          </BodyWrapper>
        </AppWrapper>
      </Router>
    </Suspense>
  )
}

export default App
