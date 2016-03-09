import React from 'react'
import { roundScore } from 'src/selectors'
import * as AppPropTypes from 'src/prop-types'
import { connect } from 'react-redux'

export const Score = ({ round }) => (round.ended ?
   <p>The score</p>
   :
   <span />
)

Score.propTypes = {
  round: AppPropTypes.round.isRequired
}

const mapStateToProps = state => ({
  round: state.round,
  scores: roundScore(state)
})

export default connect(mapStateToProps)(Score)

