import { TypingBox, Timer } from 'src/components'
import * as AppPropTypes from 'src/prop-types'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Controls = ({ dispatch, round, timeRemaining }) => (
  <article>
    <TypingBox dispatch={dispatch} round={round} />
    <Timer dispatch={dispatch} round={round} timeRemaining={timeRemaining} />
  </article>
)

Controls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired,
  timeRemaining: AppPropTypes.timeRemaining.isRequired
}

const mapStateToProps = ({ round, timeRemaining }) => ({ round, timeRemaining })

export default connect(mapStateToProps)(Controls)

