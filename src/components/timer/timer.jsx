import React, { PropTypes } from 'react'
import Countdown from './countdown'
import StartButton from './start-button'
import { startTimer } from 'src/actions'
import * as AppPropTypes from 'src/prop-types'
import { connect } from 'react-redux'

const onStartButtonClick = dispatch => (
  () => dispatch(startTimer())
)

export const Timer = ({ dispatch, round, timeRemaining }) => (
  <article>
    <Countdown timeRemaining={timeRemaining} />
    <StartButton disabled={round.started} onClick={onStartButtonClick(dispatch)} />
  </article>
)

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired,
  timeRemaining: AppPropTypes.timeRemaining.isRequired
}

const mapStateToProps = ({ round, timeRemaining }) => ({ round, timeRemaining })

export default connect(mapStateToProps)(Timer)

