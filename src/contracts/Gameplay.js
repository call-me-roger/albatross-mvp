import { provider } from 'constants/provider'
import { ethers } from 'ethers'
import { convertABI, _callback } from './utils'

const GAMEPLAY_CONTRACT_ADDRESS = '0x246C65e008Eee96bfC44934d4dC8A877dF61171d'
const SOL_GAMEPLAY_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prizeId',
        type: 'uint256',
      },
    ],
    name: 'RoulletPrize',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_matchResult',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_roundId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'RoundPlayed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'claimBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'claimNFTBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'claimResetCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'claimResetDurability',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'claimUpgrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'durabilityDropRate',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'energyBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'findGame',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGolfClubContractAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'getStats',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'readyTime',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'durability',
            type: 'uint16',
          },
        ],
        internalType: 'struct GolfClubRewards.Stats',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getToken',
    outputs: [
      {
        internalType: 'contract GolfClubNFT',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'golfClubStats',
    outputs: [
      {
        internalType: 'uint256',
        name: 'readyTime',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: 'durability',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'havePlayed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'playRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'playerRounds',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: 'bonusPerkType',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'hole',
        type: 'uint16',
      },
      {
        internalType: 'bool',
        name: 'victory',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'repairBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'roulettePrizePercentages',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'secondsToPlay',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'sendEthFromContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sendEthToContract',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address',
      },
    ],
    name: 'setGolfClubContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'testBalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'totalRounds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'upgradeBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'victories',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'victoryProbability',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const GAMEPLAY_ABI = [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event RoulletPrize(address _owner, uint256 prizeId)',
  'event RoundPlayed(uint256 _golfClubId, uint256 _matchResult, uint256 _roundId, address _owner)',
  'function claimBalance(address) view returns (uint256)',
  'function claimNFT()',
  'function claimNFTBalance(address) view returns (uint256)',
  'function claimResetCooldown(uint256 _golfClubId)',
  'function claimResetDurability(uint256 _golfClubId)',
  'function claimRewards()',
  'function claimUpgrade(uint256 _golfClubId)',
  'function durabilityDropRate(uint256) view returns (uint8)',
  'function energyBalance(address) view returns (uint256)',
  'function findGame() payable',
  'function getGolfClubContractAddress() view returns (address)',
  'function getStats(uint256 _golfClubId) view returns (tuple(uint256 readyTime, uint16 durability))',
  'function getToken() view returns (address)',
  'function golfClubStats(uint256) view returns (uint256 readyTime, uint16 durability)',
  'function havePlayed(uint256) view returns (bool)',
  'function isOwner() view returns (bool)',
  'function owner() view returns (address)',
  'function playRound(uint256 _golfClubId)',
  'function playerRounds(address, uint256) view returns (uint256 id, uint16 bonusPerkType, uint16 hole, bool victory)',
  'function renounceOwnership()',
  'function repairBalance(address) view returns (uint256)',
  'function roulettePrizePercentages(uint256) view returns (uint8)',
  'function secondsToPlay(uint256 _golfClubId) view returns (uint256)',
  'function sendEthFromContract(address _to, uint256 _amount)',
  'function sendEthToContract() payable',
  'function setGolfClubContract(address _contractAddress)',
  'function testBalance()',
  'function totalRounds(address) view returns (uint256)',
  'function transferOwnership(address newOwner)',
  'function upgradeBalance(address) view returns (uint256)',
  'function victories(address) view returns (uint256)',
  'function victoryProbability(uint256) view returns (uint8)',
]

export function log() {
  console.log(convertABI(SOL_GAMEPLAY_ABI))
}
//log()

export function getGameplaySignedContract(signer) {
  return new ethers.Contract(GAMEPLAY_CONTRACT_ADDRESS, GAMEPLAY_ABI, signer)
}

export function getGameplayReadContract() {
  return new ethers.Contract(GAMEPLAY_CONTRACT_ADDRESS, GAMEPLAY_ABI, provider)
}
//

export async function getRounds() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  let currentRoundIndex = -1

  if (address) {
    try {
      const contract = getGameplayReadContract()
      const getRounds = await contract.totalRounds(address)
      const totalRounds = getRounds.toNumber()

      if (totalRounds > 0) {
        for (let i = 0; i < totalRounds; i++) {
          const round = await contract.playerRounds(address, i)
          if (!round.victory && currentRoundIndex === -1) currentRoundIndex = i
          result.push(round)
        }
      }
    } catch (err) {
      console.log({ err })
      alert(
        'Error getting owner collection. Connect your wallet or change the network!',
      )
    }
  }
  return { rounds: result, currentRoundIndex }
}

export async function getRoulletteBalances() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    const contract = getGameplayReadContract()
    const upgradeBalance = await contract.upgradeBalance(address)
    const claimNFTBalance = await contract.claimNFTBalance(address)
    const energyBalance = await contract.upgradeBalance(address)
    const repairBalance = await contract.repairBalance(address)

    return {
      upgradeBalance: upgradeBalance.toNumber(),
      claimNFTBalance: claimNFTBalance.toNumber(),
      energyBalance: energyBalance.toNumber(),
      repairBalance: repairBalance.toNumber(),
    }
  }
}

export async function findGame({ onSend, onSuccess, onError }) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  const gameFeePrice = '0.015'
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.findGame({
        value: ethers.utils.parseEther(gameFeePrice),
      })
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      console.log({ err })
      _callback(onError, err)
    }
  }
  return result
}

export async function playGame(_golfClubId, { onSend, onSuccess, onError }) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.playRound(_golfClubId)
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
  return result
}

export async function getClaimBalance() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const result = await contract.claimBalance(address)
      return ethers.utils.formatEther(result)
    } catch (err) {
      console.log({ err }, 'Error getting claim balance. Try again!')
    }
  }
}

export async function claimRewards({ onSend, onSuccess, onError }) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.claimRewards()
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
}

export async function claimNFT({ onSend, onSuccess, onError }) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.claimNFT()
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
}

export async function claimUpgrade(
  _golfClubId,
  { onSend, onSuccess, onError },
) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.claimUpgrade(_golfClubId)
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
}

export async function claimResetCooldown(
  _golfClubId,
  { onSend, onSuccess, onError },
) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.claimResetCooldown(_golfClubId)
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
}

export async function claimResetDurability(
  _golfClubId,
  { onSend, onSuccess, onError },
) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getGameplaySignedContract(signer)
      const sent = await contract.claimResetDurability(_golfClubId)
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
}

export function getTournamentNumberByRoundIndex(_roundIndex) {
  return Math.ceil((((_roundIndex + 1) / 18) * 100) / 100)
}

export async function getGameplayDetails(_golfClubId) {
  const contract = getGameplayReadContract()
  const secondsToPlay = await contract.secondsToPlay(_golfClubId)
  return {
    secondsToPlay: secondsToPlay.toNumber(),
  }
}

export async function listenRoundPlayed(callback) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    const contract = getGameplayReadContract()
    contract.on(
      'RoundPlayed',
      (_golfClubId, _matchResult, _roundId, _owner) => {
        if (_owner === address) {
          const result = {
            _golfClubId: _golfClubId.toNumber(),
            _matchResult: _matchResult.toNumber(),
            _roundId: _roundId.toNumber(),
          }
          if (typeof callback === 'function') callback(result)
        }
      },
    )
  }
}

export async function listenRoulletReward(callback) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    console.log('listenRoulletReward')
    const contract = getGameplayReadContract()
    contract.on('RoulletPrize', (_owner, _prizeId) => {
      if (_owner === address) {
        const result = {
          _prizeId: _prizeId.toNumber(),
        }
        if (typeof callback === 'function') callback(result)
      }
    })
  }
}
