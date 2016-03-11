import React from 'react'
import { roundScore } from 'src/selectors'
import * as AppPropTypes from 'src/prop-types'
import { connect } from 'react-redux'
import styles from './score.css'

export const Score = ({ round, scores }) => (round.ended &&
  <article>
   <h3>Your score</h3>
   <p className={styles.correctScore}>Correct: {scores.correct}</p>
   <p className={styles.incorrectScore}>Incorrect: {scores.incorrect}</p>
  </article>
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

