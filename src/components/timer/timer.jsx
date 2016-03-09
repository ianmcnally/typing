import React, { PropTypes } from 'react'
import Countdown from './countdown'
import StartButton from './start-button'
import RetryButton from './retry-button'
import { startTimer } from 'src/actions/start-timer'
import * as AppPropTypes from 'src/prop-types'
import { connect } from 'react-redux'

const onStartButtonClick = dispatch => (
  () => dispatch(startTimer())
)

const shouldDisableStartForRound = round => Boolean(round.started || round.ended)

export const Timer = ({ dispatch, round, timeRemaining }) => (
  <article>
    <Countdown timeRemaining={timeRemaining} />
    <StartButton disabled={shouldDisableStartForRound(round)} onClick={onStartButtonClick(dispatch)} />
    <RetryButton />
  </article>
)

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired,
  timeRemaining: AppPropTypes.timeRemaining.isRequired
}

const mapStateToProps = ({ round, timeRemaining }) => ({ round, timeRemaining })

export default connect(mapStateToProps)(Timer)

