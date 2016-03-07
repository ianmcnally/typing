import { ROUND_ENDED, ROUND_STARTED, SUBMISSION_GRADED, TIME_ADVANCED } from 'src/action-types'
import { start as timerStart } from 'src/lib/timer'

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

const timeAdvanced = timeRemaining => ({
  type: TIME_ADVANCED,
  timeRemaining
})

const roundStarted = () => ({
  type: ROUND_STARTED
})

const roundEnded = () => ({
  type: ROUND_ENDED
})

export const startTimer = () => (
  dispatch => {
    dispatch(roundStarted())

    timerStart().subscribe(
      timeRemaining => dispatch(timeAdvanced(timeRemaining)),
      () => {},
      () => dispatch(roundEnded())
    )

  }
)
