import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { create_wallet } from 'doric-core/actions/wallet'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import {
  is_valid_password_length,
  passwords_match,
} from 'doric-core/helpers/wallet'
import { ButtonGray, ButtonLight } from 'components/Button'
import SlideContainer from '../Slides/SlideContainer'
import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import { ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import { clientSyncRefresh } from 'doric-core/actions/main'
import SimpleLoader from 'components/SimpleLoader'

const PageWrapper = styled(AutoColumn)`
  max-width: 870px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`

const ButtonCard = styled(ColumnCenter)`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  width: 60%;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`

const Password = ({ history, create_wallet, seed, clientSyncRefresh }) => {
  const { t } = useTranslation()

  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const { string: WALLET_SEED } = seed

  const onChange = (slug, value) => {
    setForm({ ...form, [slug]: value })
  }

  const [isLoading, setLoading] = useState(false)

  function refreshWallet({ address }) {
    history.push(`/`)
    clientSyncRefresh({ address })
  }

  function handleLogin() {
    setLoading(true)

    create_wallet({
      password: form.password,
      seed: WALLET_SEED,
      onSuccess: refreshWallet,
      onFail: () => {
        alert(t(`Oops something went wrong!`))
        setLoading(false)
      },
    })
  }

  const canLogin =
    is_valid_password_length(form.password) &&
    passwords_match(form.password, form.confirmPassword) &&
    !isLoading

  return (
    <SlideContainer>
      <PageWrapper>
        <TYPE.largeHeader>{t(`Signup`)}</TYPE.largeHeader>
        <FormInputRow>
          <SimpleInput placeholder={t(`E-mail`)} disabled />
        </FormInputRow>
        <FormInputRow>
          <SimpleInput
            onChange={e => onChange(`password`, e.target.value)}
            value={form.password}
            type={`password`}
            placeholder={t(`Password`)}
            data-cy="password-input"
          />
        </FormInputRow>
        <FormInputRow>
          <SimpleInput
            onChange={e => onChange(`confirmPassword`, e.target.value)}
            value={form.confirmPassword}
            type={`password`}
            placeholder={t(`Retry password`)}
            data-cy="check-password-input"
          />
        </FormInputRow>

        <ButtonCard>
          <ButtonGray margin="5px" width="100%" onClick={() => history.go(-1)}>
            {t(`Go back`)}
          </ButtonGray>

          <ButtonLight
            margin="5px"
            width="100%"
            onClick={handleLogin}
            disabled={!canLogin}
            data-cy="create-wallet-btn"
          >
            {isLoading ? <SimpleLoader /> : t('Login')}
          </ButtonLight>
        </ButtonCard>
      </PageWrapper>
    </SlideContainer>
  )
}

const state = ({ wallet_created, seed }) => ({ wallet_created, seed })
export default connect(state, { create_wallet, clientSyncRefresh })(
  withRouter(Password),
)
