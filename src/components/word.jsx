import React from 'react'
import * as AppPropTypes from 'src/prop-types'

const Word = ({ value }) => (
  <span>{value}</span>
)

Word.propTypes = {
  value : AppPropTypes.word
}

export default Word

