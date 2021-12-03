import { useEffect } from 'react'
import { useRouletteState } from 'store/roulette/state'
import { getRoulletteBalances } from 'contracts/Gameplay'

const useRouletteBalances = props => {
  const { initialFetch = false } = props || {}
  const { claimNFTBalance, setBalance } = useRouletteState()

  async function refreshBalance() {
    const newBalances = await getRoulletteBalances()
    console.log({ newBalances })
    setBalance('upgradeBalance', newBalances.upgradeBalance)
    setBalance('claimNFTBalance', newBalances.claimNFTBalance)
    setBalance('energyBalance', newBalances.energyBalance)
    setBalance('repairBalance', newBalances.repairBalance)
  }

  useEffect(() => {
    if (initialFetch) refreshBalance()
    // eslint-disable-next-line
  }, [])

  return { claimNFTBalance, refreshBalance }
}

export default useRouletteBalances
