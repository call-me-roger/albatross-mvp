import axios from 'axios'

const EXPLORER_BASE_URL = 'https://explorer.doric.network'

export function getExplorerTXURL(hash) {
  return `${EXPLORER_BASE_URL}/tx/${hash}`
}

export function getTransactionsByAddressURL(address) {
  const url = `${EXPLORER_BASE_URL}/api.php?action=transactions&wallet=${address}`
  return url
}

export async function getTransactionsByAddress(address) {
  const { data: response } = await axios.get(
    getTransactionsByAddressURL(address),
  )
  const { data = [] } = response

  return data
}
