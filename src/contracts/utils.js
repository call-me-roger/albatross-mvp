import { ethers } from 'ethers'

export function _callback(functionHandler, args) {
  if (typeof functionHandler === 'function') functionHandler(args)
}

export function convertABI(ABI) {
  const newABI = new ethers.utils.Interface(ABI)

  return newABI.format()
}
