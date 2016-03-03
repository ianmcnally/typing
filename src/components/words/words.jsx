import React from 'react'
import { connect } from 'react-redux'
import { Word } from 'src/components'
import * as AppPropTypes from 'src/prop-types'
import map from 'lodash.map'

export const Words = ({ words }) => (
  <article>
    {map(words, (word, idx) => (
    <Word value={word} index={idx} key={idx} />
    ))}
  </article>
)

Words.propTypes = {
  words : AppPropTypes.words
}

const mapStateToProps = ({ words }) => ({ words })

export default connect(mapStateToProps)(Words)

