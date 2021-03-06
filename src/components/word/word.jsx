import React from 'react'
import cx from 'classnames'
import * as AppPropTypes from 'src/prop-types'
import styles from './word.css'

const Word = ({ submission, value }) => {
  const wordClasses = cx({
    [styles.word]: true,
    [styles.correctWord]: submission && submission.isCorrect,
    [styles.incorrectWord]: submission && !submission.isCorrect
  })

  return <span className={wordClasses}>{value}</span>
}

Word.propTypes = {
  submission: AppPropTypes.submittedWord,
  value: AppPropTypes.word.isRequired
}

export default Word

