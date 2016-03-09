import React from 'react'
import { roundScore } from 'src/selectors'
import * as AppPropTypes from 'src/prop-types'
import { connect } from 'react-redux'

export const Score = ({ round, scores }) => (round.ended ?
  <article>
   <h3>Your score</h3>
   <p>Correct: {scores.correct}</p>
   <p>Incorrect: {scores.incorrect}</p>
  </article>
 :
 <span />
)

Score.propTypes = {
  round: AppPropTypes.round.isRequired,
  scores: AppPropTypes.scores.isRequired
}

const mapStateToProps = state => ({
  round: state.round,
  scores: roundScore(state)
})

export default connect(mapStateToProps)(Score)

