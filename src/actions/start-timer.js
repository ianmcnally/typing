import { ROUND_ENDED, ROUND_STARTED, TIME_ADVANCED } from 'src/action-types'
import { start as timerStart } from 'src/lib/timer'

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

