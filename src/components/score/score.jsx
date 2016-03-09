import React from 'react'
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

const mapStateToProps = ({ round }) => ({ round })

export default connect(mapStateToProps)(Score)

