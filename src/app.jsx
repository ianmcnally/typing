/* eslint-disable react/no-multi-comp */

import React, { PropTypes } from 'react'
import map from 'lodash.map'

export const Word = ({ value }) => (
  <span>{value}</span>
)

Word.propTypes = {
  value : PropTypes.string.isRequired
}

export const Words = ({ words }) => (
  <article>
    {map(words, (word, idx) => (
    <Word value={word} index={idx} key={idx} />
    ))}
  </article>
)

Words.propTypes = {
  words : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export const App = () => (
  <section>
    <Words words={['a', 'bee']} />
  </section>
)

