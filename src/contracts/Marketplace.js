import { provider } from 'constants/provider'
import { ethers } from 'ethers'
import { getNFTDetails } from './GolfClub'
import { getNFTReadContract } from './GolfClub'

const MARKETPLACE_CONTRACT_ADDRESS =
  '0x2E0c050459aea0d5767E1007ad00d714BB899Ba6'
const SOL_MARKETPLACE_ABI = [
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
        name: '_price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_active',
        type: 'bool',
      },
    ],
    name: 'ListingUpdate',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_golfClubId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
    ],
    name: 'addListing',
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
    name: 'cancelListing',
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
    name: 'claimOwnerBalance',
    outputs: [],
    stateMutability: 'nonpayable',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'listingIndexToToken',
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
    name: 'listings',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool',
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
    name: 'listingsBalance',
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
    name: 'nextListingId',
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
        name: '_golfClubId',
        type: 'uint256',
      },
    ],
    name: 'purchase',
    outputs: [],
    stateMutability: 'payable',
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
]

const MARKETPLACE_ABI = [
  'event ListingUpdate(uint256 _golfClubId, uint256 _price, address _seller, bool _active)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'function addListing(uint256 _golfClubId, uint256 _price)',
  'function cancelListing(uint256 _golfClubId)',
  'function claimBalance(address) view returns (uint256)',
  'function claimOwnerBalance()',
  'function getToken() view returns (address)',
  'function isOwner() view returns (bool)',
  'function listingIndexToToken(uint256) view returns (uint256)',
  'function listings(uint256) view returns (uint256 price, address seller, bool active)',
  'function listingsBalance(address) view returns (uint256)',
  'function nextListingId() view returns (uint256)',
  'function owner() view returns (address)',
  'function purchase(uint256 _golfClubId) payable',
  'function renounceOwnership()',
  'function setGolfClubContract(address _contractAddress)',
  'function transferOwnership(address newOwner)',
]

export function convertABI() {
  const newABI = new ethers.utils.Interface(SOL_MARKETPLACE_ABI)

  return newABI.format()
}
//console.log('marketplaceABI', convertABI())

export function getSignedContractMarketplace(signer) {
  return new ethers.Contract(
    MARKETPLACE_CONTRACT_ADDRESS,
    MARKETPLACE_ABI,
    signer,
  )
}

function getReadContractMarketplace() {
  return new ethers.Contract(
    MARKETPLACE_CONTRACT_ADDRESS,
    MARKETPLACE_ABI,
    provider,
  )
}

export async function getListings() {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const listedTokenIds = []

  if (address) {
    const contract = getReadContractMarketplace()
    const nextListingId = await contract.nextListingId()
    const totalListings = nextListingId.toNumber()
    for (let i = 0; i < totalListings; i++) {
      const bigNumberTokenId = await contract.listingIndexToToken(i)
      const tokenId = bigNumberTokenId.toNumber()
      if (listedTokenIds.indexOf(tokenId) === -1) listedTokenIds.push(tokenId)
    }
  }

  return listedTokenIds
}

export async function getListedTokens() {
  const listedTokenIds = await getListings()
  const result = []
  const contract = getReadContractMarketplace()
  const nftContract = getNFTReadContract()

  await Promise.all(
    listedTokenIds.map(async tokenId => {
      const listedData = await contract.listings(tokenId)
      if (listedData?.active) {
        result.push({
          listing: {
            ...listedData,
            price: ethers.utils.formatEther(listedData.price),
          },
          nft: await getNFTDetails(nftContract, tokenId),
        })
      }
    }),
  )

  return result
}
