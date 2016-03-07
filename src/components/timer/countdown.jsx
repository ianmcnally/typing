import React from 'react'
import * as AppPropTypes from 'src/prop-types'

const Countdown = ({ timeRemaining }) => (
  <span>{timeRemaining}</span>
)

Countdown.propTypes = {
  timeRemaining: AppPropTypes.timeRemaining.isRequired
}

export default Countdown

