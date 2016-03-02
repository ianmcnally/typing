import React from 'react'
import { Word } from 'src/components'
import * as AppPropTypes from 'src/prop-types'
import map from 'lodash.map'

const Words = ({ words }) => (
  <article>
    {map(words, (word, idx) => (
    <Word value={word} index={idx} key={idx} />
    ))}
  </article>
)

Words.propTypes = {
  words : AppPropTypes.words
}

export default Words

