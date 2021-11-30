import { provider } from 'constants/provider'
import { ethers } from 'ethers'
import { ruleOfThree } from 'utils/MathUtils'

export const GOLF_CLUB_CONTRACT_ADDRESS =
  '0xE6FF9aE431AD542956F78653c7535e03F56CB153'
const SOL_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'concatGolfClubName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
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
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'getCollectionByOwner',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
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
    name: 'golf_clubs',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'dna',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'level',
        type: 'uint32',
      },
      {
        internalType: 'uint32',
        name: 'readyTime',
        type: 'uint32',
      },
      {
        internalType: 'uint16',
        name: 'durability',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'winCount',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'lossCount',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'playType',
        type: 'uint16',
      },
      {
        internalType: 'uint8',
        name: 'rarity',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
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
    name: 'maxCollection',
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
    name: 'maxMintPerWallet',
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
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextTokenId',
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
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
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
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'resetCooldown',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
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
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newBaseURI',
        type: 'string',
      },
    ],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
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
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
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
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'upgradeGolfClub',
    outputs: [],
    stateMutability: 'payable',
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
]
export const GOLF_CLUB_CONTRACT_ABI = [
  'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
  'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event RoundPlayed(uint256 _golfClubId, uint256 _matchResult, uint256 _roundId, address _owner)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function balanceOf(address owner) view returns (uint256)',
  'function claimBalance(address) view returns (uint256)',
  'function claimRewards()',
  'function concatGolfClubName(uint256 _tokenId) pure returns (string)',
  'function findGame() payable',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function getCollectionByOwner(address _owner) view returns (uint256[])',
  'function golf_clubs(uint256) view returns (uint256 id, uint256 dna, uint32 level, uint32 readyTime, uint16 durability, uint16 winCount, uint16 lossCount, uint16 playType, uint8 rarity, string name)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function isOwner() view returns (bool)',
  'function maxCollection() view returns (uint256)',
  'function maxMintPerWallet() view returns (uint256)',
  'function mint(address _to, uint256 _quantity) payable',
  'function name() view returns (string)',
  'function nextTokenId() view returns (uint256)',
  'function owner() view returns (address)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function playRound(uint256 _golfClubId)',
  'function playerRounds(address, uint256) view returns (uint256 id, uint16 bonusPerkType, uint16 hole, bool victory)',
  'function renounceOwnership()',
  'function resetCooldown(uint256 _golfClubId) payable',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)',
  'function secondsToPlay(uint256 _golfClubId) view returns (uint256)',
  'function sendEthFromContract(address _to, uint256 _amount)',
  'function sendEthToContract() payable',
  'function setApprovalForAll(address operator, bool approved)',
  'function setBaseURI(string _newBaseURI)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function symbol() view returns (string)',
  'function tokenURI(uint256 _golfClubId) view returns (string)',
  'function totalRounds(address) view returns (uint256)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function transferOwnership(address newOwner)',
  'function upgradeGolfClub(uint256 _golfClubId) payable',
  'function victories(address) view returns (uint256)',
]

function getNFTSignedContract(signer) {
  return new ethers.Contract(
    GOLF_CLUB_CONTRACT_ADDRESS,
    GOLF_CLUB_CONTRACT_ABI,
    signer,
  )
}

export function getNFTReadContract() {
  return new ethers.Contract(
    GOLF_CLUB_CONTRACT_ADDRESS,
    GOLF_CLUB_CONTRACT_ABI,
    provider,
  )
}

export function convertABI() {
  const newABI = new ethers.utils.Interface(SOL_ABI)

  return newABI.format()
}
//console.log(convertABI())

export const getPerkByType = _type => {
  if (Number(_type) === 100) return 'Long'
  if (Number(_type) === 200) return 'Short'
  if (Number(_type) === 300) return 'Precision'
  if (Number(_type) === 400) return 'Obstacle'
  return 'Undefined'
}

export const getMintValueByQty = _quantity => {
  const price = 1
  return Number(_quantity * price).toString()
}

export async function mint(
  _quantity,
  { onSuccess, onError, onSendTransaction },
) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getNFTSignedContract(signer)
      const sent = await contract.mint(address, _quantity, {
        value: ethers.utils.parseEther(getMintValueByQty(_quantity)),
      })
      if (typeof onSendTransaction === 'function')
        onSendTransaction({ result: sent })
      await sent.wait(1)
      if (typeof onSuccess === 'function') onSuccess({ result: sent })
    } catch (error) {
      if (typeof onError === 'function') onError({ error })
    }
  }
}

export async function getNFTDetails(contract, _golfClubId) {
  const nftDetails = await contract.golf_clubs(_golfClubId)
  const secondsToPlay = await contract.secondsToPlay(_golfClubId)
  return {
    ...nftDetails,
    id: _golfClubId,
    dna: nftDetails.dna.toString(),
    secondsToPlay: secondsToPlay.toNumber(),
    tokenURI: await contract.tokenURI(_golfClubId),
  }
}

export async function getCollection() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  if (address) {
    try {
      const contract = getNFTReadContract()
      const collection = await contract.getCollectionByOwner(address)
      await Promise.all(
        collection.map(async bigNumberTokenId => {
          const tokenId = bigNumberTokenId.toString()
          result.push(await getNFTDetails(contract, tokenId))
        }),
      )
    } catch (err) {
      console.log({ err })
      alert(
        'Error getting owner collection. Connect your wallet or change the network!',
      )
    }
  }
  return result
}

export async function getRounds() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  let currentRoundIndex = -1

  if (address) {
    try {
      const contract = getNFTReadContract()
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

export async function findGame({ onStart, onSuccess, onError }) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  const gameFeePrice = '0.015'
  if (address) {
    try {
      const contract = getNFTSignedContract(signer)
      const sent = await contract.findGame({
        value: ethers.utils.parseEther(gameFeePrice),
      })
      if (typeof onSuccess === 'function') onStart()
      await sent.wait(1)
      if (typeof onSuccess === 'function') onSuccess()
    } catch (err) {
      console.log({ err })
      if (typeof onError === 'function') onError()
    }
  }
  return result
}

export async function playGame(_golfClubId, callback) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const result = []
  if (address) {
    try {
      const contract = getNFTSignedContract(signer)
      const sent = await contract.playRound(_golfClubId)
      await sent.wait(1)
      if (typeof callback === 'function') callback()
    } catch (err) {
      console.log({ err })
      alert('Error trying to play. Try again!')
    }
  }
  return result
}

export async function listenRoundPlayed(callback) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    const contract = getNFTReadContract()
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

export async function getClaimBalance() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getNFTSignedContract(signer)
      const result = await contract.claimBalance(address)
      return ethers.utils.formatEther(result)
    } catch (err) {
      console.log({ err }, 'Error getting claim balance. Try again!')
    }
  }
}

export async function claimRewards(callback) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getNFTSignedContract(signer)
      const result = await contract.claimRewards()
      await result.wait(1)
      if (typeof callback === 'function') callback()
    } catch (err) {
      console.log({ err })
      alert('Error trying to claim rewards. Try again!')
    }
  }
}

export function getBackgroundByRarity(_rarity) {
  if (_rarity === 4) return '#bb9700'
  if (_rarity === 3) return '#be32f3'
  if (_rarity === 2) return '#0071e1'
  if (_rarity === 1) return '#00ff01'
  return '#dedede'
}

export function getRarityTextByInt(_rarity) {
  if (_rarity === 4) return 'Legendary'
  if (_rarity === 3) return 'Epic'
  if (_rarity === 2) return 'Rare'
  if (_rarity === 1) return 'Uncommon'
  return 'Common'
}

export function getSecondsToPlayPercentage(_secondsToPlay) {
  const total24h = 86400
  return ruleOfThree(total24h, _secondsToPlay)
}

export function getTournamentNumberByRoundIndex(_roundIndex) {
  return Math.ceil((((_roundIndex + 1) / 18) * 100) / 100)
}
