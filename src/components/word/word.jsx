import React from 'react'
import * as AppPropTypes from 'src/prop-types'
import styles from './word.css'

const Word = ({ value }) => (
  <span className={styles.word}>{value}</span>
)

Word.propTypes = {
  value: AppPropTypes.word
}

export default Word

