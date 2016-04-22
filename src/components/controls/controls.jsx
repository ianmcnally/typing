import { TypingBox, Timer } from 'src/components'
import * as AppPropTypes from 'src/prop-types'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Controls = ({ disableInput, dispatch, round, timeRemaining }) => (
  <article>
    <TypingBox disabled={disableInput} dispatch={dispatch} round={round} />
    <Timer disableStart={disableInput} dispatch={dispatch} round={round} timeRemaining={timeRemaining} />
  </article>
)

Controls.propTypes = {
  disableInput: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired,
  timeRemaining: AppPropTypes.timeRemaining.isRequired
}

const mapStateToProps = ({ round, timeRemaining, words }) => ({
  disableInput: !words.length,
  round,
  timeRemaining
})

export default connect(mapStateToProps)(Controls)

