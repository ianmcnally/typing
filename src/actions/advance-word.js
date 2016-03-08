import { SUBMISSION_GRADED } from 'src/action-types'
import { startTimer } from './start-timer'

const submissionGraded = (submittedValue, correctValue) => ({
  type: SUBMISSION_GRADED,
  submission: {
    value: submittedValue,
    isCorrect: submittedValue === correctValue
  }
})

export const advanceWord = submission => (
  (dispatch, getState) => {
    const { round, submittedWords, words } = getState()

    if (!round.started)
      dispatch(startTimer())

    const allWordsSubmitted = submittedWords.length >= words.length

    if (allWordsSubmitted)
      return

    dispatch(submissionGraded(submission, words[submittedWords.length]))
  }
)

