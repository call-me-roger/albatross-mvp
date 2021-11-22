import { connect } from 'react-redux'
import { init } from 'doric-core/actions/main'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const InitController = ({ init }) => {
  const history = useHistory()

  useEffect(() => {
    init({
      handleLogin: () => {
        history.push('/login')
      },
      handleDashboard: () => {
        history.push('/')
      },
      handleOnBoarding: () => {
        history.push('/welcome')
      },
    })
  }, [init, history])

  return null
}

export default connect(null, { init })(InitController)
