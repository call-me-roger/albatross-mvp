import { provider } from 'constants/provider'
import { _callback } from './utils'

export async function listenBalance(event) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  if (address) {
    console.log('listenBalance')
    provider.on('block', async () => {
      _callback(event, { address })
    })
  }
}
