import { SUBMISSION_GRADED } from 'src/action-types'

const submissionGraded = (submittedValue, correctValue) => ({
  type: SUBMISSION_GRADED,
  submission: {
    value: submittedValue,
    isCorrect: submittedValue === correctValue
  }
})

export const advanceAWord = submission => (
  (dispatch, getState) => {
    const { submittedWords, words } = getState()

    const allWordsSubmitted = submittedWords.length >= words.length

    if (allWordsSubmitted)
      return

    dispatch(submissionGraded(submission, words[submittedWords.length]))
  }
)

