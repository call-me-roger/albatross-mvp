import { useEffect } from 'react'
import useSWR from 'swr'
import {
  getTransactionsByAddressURL,
  getTransactionsByAddress,
} from 'constants/explorer'

const useAddressTransactions = ({ address, onChange }) => {
  const { data: transactions, error } = useSWR(
    getTransactionsByAddressURL(address),
    async () => {
      const fetchedTXs = await getTransactionsByAddress(address)
      return fetchedTXs
    },
  )

  useEffect(() => {
    if (typeof onChange === 'function') onChange({ transactions })
    // eslint-disable-next-line
  }, [transactions])

  return { error, transactions }
}

export default useAddressTransactions
