import { createSelector } from 'reselect'
import reduce from 'lodash.reduce'

const emptyArray = []

const submittedWordsSelector = ({ submittedWords = emptyArray }) => submittedWords

const initialGrades = { correct: 0, incorrect: 0 }

export const roundScore = createSelector(
  submittedWordsSelector,
  submittedWords => reduce(submittedWords, (grades, word) => (
    (word.isCorrect) ?
    { ...grades, correct: grades.correct + 1 } :
    { ...grades, incorrect: grades.incorrect + 1 }
  ), initialGrades)
)

