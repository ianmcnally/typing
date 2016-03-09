import { createSelector } from 'reselect'
import reduce from 'lodash.reduce'
import { submittedWordsSelector } from './state'

const initialGrades = { correct: 0, incorrect: 0 }

export default createSelector(
  submittedWordsSelector,
  submittedWords => reduce(submittedWords, (grades, word) => (
    (word.isCorrect) ?
    { ...grades, correct: grades.correct + 1 } :
    { ...grades, incorrect: grades.incorrect + 1 }
  ), initialGrades)
)

