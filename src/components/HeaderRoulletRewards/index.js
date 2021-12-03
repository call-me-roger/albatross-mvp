import Tooltip from 'components/Tooltip'
import { claimNFT } from 'contracts/Gameplay'
import useCallbackPopups from 'hooks/useCallbackPopups'
import useRouletteBalances from 'hooks/useRoulletBalances'
import React from 'react'
import { FolderPlus, Star, Tool, Zap } from 'react-feather'
import { Flex } from 'rebass'
import { CLAIM_NFT } from 'store/application/types'
import { useRouletteState } from 'store/roulette/state'
import styled from 'styled-components'

const BalanceIcon = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0px;
  margin-left: 25px;
  border-radius: 10px;
  cursor: pointer;

  .icon {
    position: relative;
    left: -10px;
    width: 35px;
    height: 35px;
    background-color: #222;
    border-radius: 50%;
    transform: scele(1.1);
    text-align: center;
    line-height: 45px;
    color: #bac200;
  }

  .value {
    padding: 0px 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
    .icon {
      background-color: #444;
    }
  }
`

const HeaderRoulletRewards = () => {
  const { upgradeBalance, claimNFTBalance, energyBalance, repairBalance } =
    useRouletteState()
  const { waitingUser, onSendTx, errorPopup, successPopup } =
    useCallbackPopups()
  const { refreshBalance } = useRouletteBalances()

  function handleClaimNFT() {
    waitingUser(CLAIM_NFT)
    claimNFT({
      onSend: () => {
        onSendTx(CLAIM_NFT)
      },
      onError: err => {
        errorPopup(CLAIM_NFT, 'Error trying to Claim NFT.', err)
      },
      onSuccess: () => {
        refreshBalance()
        successPopup(
          CLAIM_NFT,
          <div>
            <h3>New NFT Received</h3>
          </div>,
        )
      },
    })
  }

  return (
    <Flex justifyContent="flex-end">
      <Tooltip overflow="Upgrade Golf Club">
        <BalanceIcon>
          <div className="icon">
            <Star size="20px" />
          </div>
          <div className="value">{upgradeBalance}</div>
        </BalanceIcon>
      </Tooltip>
      <Tooltip overflow="Claim free NFT">
        <BalanceIcon onClick={handleClaimNFT}>
          <div className="icon">
            <FolderPlus size="20px" />
          </div>
          <div className="value">{claimNFTBalance}</div>
        </BalanceIcon>
      </Tooltip>
      <Tooltip overflow="Claim Golf Club energy recharge">
        <BalanceIcon>
          <div className="icon">
            <Zap size="20px" />
          </div>
          <div className="value">{energyBalance}</div>
        </BalanceIcon>
      </Tooltip>
      <Tooltip overflow="Claim free repair kit">
        <BalanceIcon>
          <div className="icon">
            <Tool size="20px" />
          </div>
          <div className="value">{repairBalance}</div>
        </BalanceIcon>
      </Tooltip>
    </Flex>
  )
}

export default HeaderRoulletRewards
