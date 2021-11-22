import { useEffect } from 'react'
import { connect } from 'react-redux'
import { wssProvider } from 'doric-core/providers'
import { clientSyncRefresh } from 'doric-core/actions/main'

const WssController = ({ client, clientSyncRefresh }) => {
  const { address } = client

  useEffect(() => {
    wssProvider.on('block', () => {
      if (address) clientSyncRefresh({ address })
    })
  }, [address, clientSyncRefresh])

  return null
}

const state = ({ client }) => ({ client })
export default connect(state, { clientSyncRefresh })(WssController)
