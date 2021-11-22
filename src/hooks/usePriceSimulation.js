import { useState, useEffect } from 'react'
import axios from 'axios'

const usePriceSimulation = () => {
  const [prices, setPrices] = useState([])

  function calcByAmount(amount) {
    return prices.map(({ symbol, price }) => {
      return {
        symbol,
        price,
        total: parseFloat(amount * price).toFixed(2),
      }
    })
  }

  useEffect(() => {
    async function get() {
      try {
        const { data: response } = await axios.get(
          'https://economia.awesomeapi.com.br/last/XRP-BRL,XRP-USD,XRP-EUR',
        )

        setPrices(
          Object.keys(response).map(key => {
            const { codein, bid } = response[key]
            return { symbol: codein, price: bid }
          }),
        )
      } catch (error) {
        console.error(
          `We found an error when search for balance of coins > ${error}`,
        )
      }
    }

    get()
  }, [])

  return { prices, calcByAmount }
}

export default usePriceSimulation
