import React from 'react'
import { Route } from 'react-router-dom'
import Error403 from 'components/Error403'
import { useAccountState } from 'store/account/state'

const ProtectedRoute = ({ path, component, authRequired, exact }) => {
  const { isLogged } = useAccountState()

  const show = (authRequired && isLogged) || !authRequired
  const render = show ? component : Error403

  return <Route path={path} component={render} exact={exact} />
}

export default ProtectedRoute
