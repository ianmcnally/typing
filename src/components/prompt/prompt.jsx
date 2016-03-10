import React from 'react'
import { connect } from 'react-redux'
import { Word } from 'src/components'
import * as AppPropTypes from 'src/prop-types'
import map from 'lodash.map'
import styles from './prompt.css'

export const Prompt = ({ words, submittedWords }) => (
  <article className={styles.prompt}>
    {map(words, (word, idx) => (
    <Word value={word} submission={submittedWords[idx]} key={idx} />
    ))}
  </article>
)

Prompt.propTypes = {
  submittedWords: AppPropTypes.submittedWords,
  words: AppPropTypes.words
}

const mapStateToProps = ({ words, submittedWords }) => ({ words, submittedWords })

export default connect(mapStateToProps)(Prompt)

