import React from 'react'
import PropTypes from 'prop-types'
import { TYPE } from '../../theme'

export function FiatValue({ fiatValue, priceImpact }) {
  const priceImpactColor = '#F55555'

  return (
    <TYPE.body fontSize={14} color="#FFF">
      {fiatValue ? (
        <div>{fiatValue?.toSignificant(6, { groupSeparator: ',' })}</div>
      ) : (
        ''
      )}
      {priceImpact ? (
        <span style={{ color: priceImpactColor }}>
          {' '}
          ({priceImpact.multiply(-1).toSignificant(3)}%)
        </span>
      ) : null}
    </TYPE.body>
  )
}

FiatValue.propTypes = {
  fiatValue: PropTypes.object.isRequired,
  priceImpact: PropTypes.object.isrequired,
}
