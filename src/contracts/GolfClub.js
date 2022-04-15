import { provider } from 'constants/provider'
import { ethers } from 'ethers'
import { ruleOfThree } from 'utils/MathUtils'
import { getGameplayDetails } from './Gameplay'
import { convertABI, _callback } from './utils'

export const GOLF_CLUB_CONTRACT_ADDRESS =
  '0x786Db1f6d1998D70BF806688ED8cDFe3917fC16f'
const SOL_NFT_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
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
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'addGolfClubLoss',
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
    name: 'addGolfClubWin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
    name: 'gameplayContractAddress',
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
        name: '_to',
        type: 'address',
      },
    ],
    name: 'gameplaySafeMintMint',
    outputs: [],
    stateMutability: 'nonpayable',
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
        name: '_nonce',
        type: 'uint256',
      },
    ],
    name: 'getRandGolfClubType',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'listTokenToSale',
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
    name: 'listedToSale',
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
    inputs: [],
    name: 'maxPublicCollection',
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
    inputs: [],
    name: 'publicMintCount',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftOwner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_toAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'safeOperatorTransfer',
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
        name: '_golfClubId',
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
        name: '_golfClubId',
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
        internalType: 'address',
        name: '_contractAddress',
        type: 'address',
      },
    ],
    name: 'setGameplayContract',
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
    inputs: [],
    name: 'totalMintCount',
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
    name: 'unlistTokenToSale',
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
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
// Dont forget to remove the duplicated safeTransferFrom, only the first one is needed
export const GOLF_CLUB_CONTRACT_ABI = [
  'constructor()',
  'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
  'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function addGolfClubLoss(uint256 _golfClubId)',
  'function addGolfClubWin(uint256 _golfClubId)',
  'function approve(address to, uint256 tokenId)',
  'function balanceOf(address owner) view returns (uint256)',
  'function concatGolfClubName(uint256 _tokenId) pure returns (string)',
  'function gameplayContractAddress() view returns (address)',
  'function gameplaySafeMintMint(address _to)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function getCollectionByOwner(address _owner) view returns (uint256[])',
  'function getRandGolfClubType(uint256 _nonce) view returns (uint16)',
  'function golf_clubs(uint256) view returns (uint256 id, uint256 dna, uint32 level, uint16 winCount, uint16 lossCount, uint16 playType, uint8 rarity, string name)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function isOwner() view returns (bool)',
  'function listTokenToSale(uint256 _golfClubId)',
  'function listedToSale(uint256) view returns (bool)',
  'function maxCollection() view returns (uint256)',
  'function maxMintPerWallet() view returns (uint256)',
  'function maxPublicCollection() view returns (uint256)',
  'function mint(address _to, uint256 _quantity) payable',
  'function name() view returns (string)',
  'function nextTokenId() view returns (uint256)',
  'function owner() view returns (address)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function publicMintCount() view returns (uint256)',
  'function renounceOwnership()',
  'function safeOperatorTransfer(address _nftOwner, address _toAddress, uint256 _golfClubId)',
  'function safeTransferFrom(address from, address to, uint256 _golfClubId)',
  'function sendEthFromContract(address _to, uint256 _amount)',
  'function sendEthToContract() payable',
  'function setApprovalForAll(address operator, bool approved)',
  'function setBaseURI(string _newBaseURI)',
  'function setGameplayContract(address _contractAddress)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function symbol() view returns (string)',
  'function tokenURI(uint256 _golfClubId) view returns (string)',
  'function totalMintCount() view returns (uint256)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function transferOwnership(address newOwner)',
  'function unlistTokenToSale(uint256 _golfClubId)',
  'function upgradeGolfClub(uint256 _golfClubId)',
]

export function log() {
  console.log(convertABI(SOL_NFT_ABI))
}
//log()

export function getNFTSignedContract(signer) {
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
      _callback(onSendTransaction, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
    }
  }
}

export async function getNFTDetails(contract, _golfClubId) {
  const nftDetails = await contract.golf_clubs(_golfClubId)
  const gameplay = await getGameplayDetails(_golfClubId)
  return {
    ...nftDetails,
    id: _golfClubId,
    dna: nftDetails.dna.toString(),
    tokenURI: await contract.tokenURI(_golfClubId),
    owner: await contract.ownerOf(_golfClubId),
    isListed: await contract.listedToSale(_golfClubId),
    gameplay,
  }
}

export async function readNFTDetails(_golfClubId) {
  const contract = getNFTReadContract()
  return getNFTDetails(contract, _golfClubId)
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

export async function transferNFT(
  _toAddress,
  _golfClubId,
  { onSend, onSuccess, onError },
) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    try {
      const contract = getNFTSignedContract(signer)
      const sent = await contract.safeTransferFrom(
        address,
        _toAddress,
        _golfClubId,
      )
      _callback(onSend, { tx: sent })
      await sent.wait(1)
      _callback(onSuccess, { tx: sent })
    } catch (err) {
      _callback(onError, err)
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
  const value = total24h - _secondsToPlay
  return ruleOfThree(total24h, value)
}

export async function listenTransfers(event) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    console.log('listenTransfers')
    const contract = getNFTReadContract()
    contract.on('Transfer', (_from, _to, _tokenId) => {
      if (_to === address) {
        const isMint = _from === '0x0000000000000000000000000000000000000000'
        _callback(event, { _tokenId: _tokenId.toNumber(), isMint })
      }
    })
  }
}
