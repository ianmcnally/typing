import React, { PropTypes } from 'react'
import Countdown from './countdown'
import StartButton from './start-button'
import RetryButton from './retry-button'
import { startTimer } from 'src/actions/start-timer'
import { retry } from 'src/actions/retry'
import * as AppPropTypes from 'src/prop-types'

const onStartButtonClick = dispatch => () => dispatch(startTimer())

const onRetryButtonClick = dispatch => () => dispatch(retry())

const shouldDisableStartForRound = round => Boolean(round.started || round.ended)

const Timer = ({ disableStart, dispatch, round, timeRemaining }) => (
  <span>
    <Countdown timeRemaining={timeRemaining} />
    <StartButton disabled={disableStart || shouldDisableStartForRound(round)} onClick={onStartButtonClick(dispatch)} />
    <RetryButton onClick={onRetryButtonClick(dispatch)} />
  </span>
)

Timer.propTypes = {
  disableStart: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired,
  timeRemaining: AppPropTypes.timeRemaining.isRequired
}

export default Timer

