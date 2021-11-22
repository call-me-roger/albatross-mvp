import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ExternalLink as LinkIcon, Globe, User } from 'react-feather'
import { Text, Flex, Box } from 'rebass'
import { AutoColumn } from 'components/Column'
import Card, { ShadowCard } from 'components/Card'
import PageTitle from 'components/Titles/Page'
import { SimpleGrid } from 'pages/Template/styles'
import { TYPE, ExternalLink } from 'theme'
import { CurrencyInputPanel } from 'components/CurrencyInputPanel'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'

import { ButtonPrimary, ButtonOutlined } from 'components/Button'
import { EthersHelpers } from 'doric-core/helpers'
import {
  searchStakingDetails,
  updateStakingTransaction,
  resetStakingTransaction,
} from 'doric-core/actions/staking'
import { clientSyncRefresh } from 'doric-core/actions/main'
import { connect } from 'react-redux'
import { CONFIRM_TRANSACTION } from 'store/application/types'
import ConfirmStake from 'components/ConfirmStake'
import { useApplicationState } from 'store/application/state'
import { getDialogByResponse } from 'components/SendTransaction/utils'
import ConfirmUnstake from 'components/ConfirmUnstake'
import usePriceSimulation from 'hooks/usePriceSimulation'

const CardSection = styled(AutoColumn)`
  grid-template-columns: 1fr;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const MaxButton = styled.button`
  font-size: 11px;
  padding: 5px;
  font-weight: bold;
  background-color: transparent;
  color: ${({ theme }) => theme.text2};
  border: none;
  margin: 0px;
  margin-top: -15px;
  cursor: pointer;
`

const AddressLink = styled(ExternalLink)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`
const Stake = ({
  client,
  staking,
  updateStakingTransaction,
  resetStakingTransaction,
  searchStakingDetails,
  clientSyncRefresh,
}) => {
  const [touched, setTouched] = useState({})
  const { openPopup, closePopup } = useApplicationState()
  const { calcByAmount } = usePriceSimulation()
  const { t } = useTranslation()

  const { balance, address } = client
  const { transaction, totalStakeAmount, walletStakeAmount } = staking

  function refreshData() {
    searchStakingDetails(address)
    clientSyncRefresh({ address })
  }

  useEffect(() => {
    if (address) searchStakingDetails(address)
  }, [address])

  function closeTransactionForm() {
    closePopup(CONFIRM_TRANSACTION)
  }

  function resetTransaction() {
    resetStakingTransaction()
    setTouched({})
  }

  function handleReponse(message, onTryAgain, params) {
    const { display } = getDialogByResponse(message, {
      onClose: () => closePopup('TRANSACTION_EVENTS'),
      onTryAgain: () => {
        closePopup('TRANSACTION_EVENTS')
        onTryAgain()
      },
      params,
    })

    if (display)
      openPopup('TRANSACTION_EVENTS', () => {
        return display
      })

    refreshData()
    closeTransactionForm()
  }

  function openTransactionConfirm() {
    openPopup(CONFIRM_TRANSACTION, () => (
      <ConfirmStake
        onConfirm={(message, params) => {
          resetTransaction()
          handleReponse(message, openTransactionConfirm, params)
        }}
        onFail={(message, params) =>
          handleReponse(message, openTransactionConfirm, params)
        }
        onEvent={message => handleReponse(message, openTransactionConfirm)}
        onCancel={closeTransactionForm}
      />
    ))
  }

  function openUnstakeConfirmation() {
    openPopup(CONFIRM_TRANSACTION, () => (
      <ConfirmUnstake
        onConfirm={(message, params) => {
          handleReponse(message, openTransactionConfirm, params)
        }}
        onFail={(message, params) =>
          handleReponse(message, openTransactionConfirm, params)
        }
        onEvent={message => handleReponse(message, openTransactionConfirm)}
        onCancel={closeTransactionForm}
      />
    ))
  }

  function doChange(key, value) {
    if (!touched[key]) setTouched({ ...touched, [key]: true })
    updateStakingTransaction(key, value)
  }

  const calculateReward = () => {
    return 0
    if (transaction.amount <= 0) return 0

    const sum1 = parseFloat(totalStakeAmount) + parseFloat(transaction.amount)
    const sum2 = parseFloat(walletStakeAmount) + parseFloat(transaction.amount)

    const calc = sum1 / sum2

    return calc.toFixed(1)
  }

  const invalidGasPrice = !EthersHelpers.is_valid_gas_price(transaction.gas)
  const noBalanceEnough = !EthersHelpers.enough_found(
    transaction.amount,
    balance,
  )
  const blockTransaction = invalidGasPrice || noBalanceEnough

  const prices = calcByAmount(walletStakeAmount)

  return (
    <SimpleGrid template="1fr 1fr">
      <CardSection>
        <ShadowCard>
          <Card>
            <Flex alignItems="center">
              <Globe size={22} />
              <TYPE.largeHeader ml={1}>{t('Total Staking')}</TYPE.largeHeader>
            </Flex>

            <Flex justifyContent="center" my={[0, 10]}>
              <Box p={3} bg="primary" textAlign="center">
                <TYPE.label fontSize={[28]} color="text2">
                  {`${totalStakeAmount || 0} DRC`}
                </TYPE.label>

                <AddressLink href="">
                  <LinkIcon size={16} />
                  <span style={{ marginLeft: '4px' }}>see contract</span>
                </AddressLink>
              </Box>
            </Flex>
          </Card>
        </ShadowCard>

        <ShadowCard>
          <Card>
            <Flex alignItems="center">
              <User size={22} />
              <TYPE.largeHeader ml={1}>{t('Staked')}</TYPE.largeHeader>
            </Flex>

            <Flex justifyContent="center" mt={[0, 15]}>
              <Box p={3} bg="primary">
                <TYPE.label fontSize={[28]} color="text2">
                  {`${walletStakeAmount || 0} DRC`}
                </TYPE.label>
              </Box>
            </Flex>

            <Flex justifyContent="space-around">
              {prices.map(({ symbol, total }) => {
                return (
                  <TYPE.body
                    key={symbol}
                    color="primary"
                  >{`${total} ${symbol}`}</TYPE.body>
                )
              })}
            </Flex>
          </Card>
        </ShadowCard>
      </CardSection>

      <CardSection>
        <ShadowCard>
          <Card>
            <PageTitle>{t(`Stake to Earn`)}</PageTitle>
            <CurrencyInputPanel
              value={transaction.amount}
              onUserInput={newValue => doChange('amount', newValue)}
              error={touched['amount'] && noBalanceEnough}
              success={touched['amount'] && !noBalanceEnough}
              tabIndex="1"
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <MaxButton onClick={() => doChange('amount', balance)}>
                MAX
              </MaxButton>
            </div>

            <FormInputRow style={{ margin: 2 }} error={invalidGasPrice}>
              <div style={{ width: '130px', padding: 0 }}>GAS Fee</div>
              <SimpleInput
                style={{ textAlign: 'right' }}
                value={transaction.gas}
                onChange={e => doChange('gas', e.target.value)}
                tabIndex="3"
              />
            </FormInputRow>

            <Text
              fontSize={[12]}
              mb={15}
              mt={1}
              ml={1}
              fontWeight="bold"
              color="primary"
            >
              {t(`Estimated rewards`)}
              {` ${calculateReward()} DRC`}
            </Text>

            <SimpleGrid template="1fr 1fr">
              <ButtonPrimary
                onClick={blockTransaction ? () => {} : openTransactionConfirm}
                width="auto"
                padding="10px"
                disable={blockTransaction}
                tabIndex="4"
                disabled={blockTransaction}
              >
                {t('Stake')}
              </ButtonPrimary>

              <ButtonOutlined
                onClick={blockTransaction ? () => {} : openUnstakeConfirmation}
                width="auto"
                padding="10px"
                tabIndex="4"
                disabled={blockTransaction}
              >
                {t('Unstake')}
              </ButtonOutlined>
            </SimpleGrid>
          </Card>
        </ShadowCard>
      </CardSection>
    </SimpleGrid>
  )
}

const state = ({ transaction, client, staking }) => ({
  transaction,
  client,
  staking,
})
export default connect(state, {
  updateStakingTransaction,
  resetStakingTransaction,
  searchStakingDetails,
  clientSyncRefresh,
})(Stake)
