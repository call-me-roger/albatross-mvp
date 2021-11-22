import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { clientSyncRefresh } from 'doric-core/actions/main'
import { login } from 'doric-core/actions/wallet'
import { WalletHelpers } from 'doric-core/helpers'
import { withRouter } from 'react-router-dom'
import { SimpleGrid } from 'pages/Template/styles'
import { AutoColumn } from 'components/Column'
import { ShadowCard } from 'components/Card'
import { ButtonLight } from 'components/Button'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import { StyledInternalLink, TYPE } from 'theme'
import SimpleLoader from 'components/SimpleLoader'

const PageWrapper = styled(AutoColumn)`
  max-width: 350px;
`

const Login = ({
  login,
  clientSyncRefresh,
  client,
  history,
  authentication,
}) => {
  const { t } = useTranslation()

  const [password, set_password] = useState(``)
  const [failed, set_failed] = useState('')
  const [isLoading, setLoading] = useState(false)

  const { logged } = authentication
  const { address } = client

  if (logged) history.push(`/`)

  function handleLogin() {
    if (!isLoading) {
      setLoading(true)

      login({
        password,
        success: () => {
          history.push(`/`)
          clientSyncRefresh({ address })
          setLoading(false)
        },
        error: err => {
          set_failed(err)
          setTimeout(() => set_failed(false), 4000)
          setLoading(false)
        },
      })
    }
  }

  function handleEnter({ keyCode }) {
    if (keyCode === 13) handleLogin()
  }

  const canLogin =
    WalletHelpers.is_valid_password_length(password) && !isLoading

  return (
    <PageWrapper>
      <SimpleGrid>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TYPE.body style={{ marginTop: '20px' }}>
            {t(`Enter your password to login`)}
          </TYPE.body>
        </div>
        <ShadowCard>
          <SimpleGrid style={{ padding: `25px` }}>
            <FormInputRow>
              <SimpleInput
                onKeyDown={handleEnter}
                onChange={e => set_password(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
              />
            </FormInputRow>

            <ButtonLight onClick={handleLogin} disabled={!canLogin}>
              {isLoading ? <SimpleLoader /> : t('Login')}
            </ButtonLight>
            {failed && (
              <TYPE.body style={{ marginTop: '20px' }}>{failed}</TYPE.body>
            )}
          </SimpleGrid>
        </ShadowCard>

        <StyledInternalLink to="/welcome" style={{ textAlign: 'center' }}>
          Forgot your password? Restore here
        </StyledInternalLink>
      </SimpleGrid>
    </PageWrapper>
  )
}

const state = ({ authentication, client }) => ({ authentication, client })
export default connect(state, { login, clientSyncRefresh })(withRouter(Login))
