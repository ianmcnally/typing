import React from 'react'
import { roundScore } from 'src/selectors'
import * as AppPropTypes from 'src/prop-types'
import { connect } from 'react-redux'

export const Score = ({ round, scores }) => (round.ended ?
   <pre>{JSON.stringify(scores, null, 2)}</pre>
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

