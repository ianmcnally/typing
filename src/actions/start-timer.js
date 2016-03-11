import { ROUND_ENDED, ROUND_STARTED, TIME_ADVANCED } from 'src/action-types'
import { start as timerStart } from 'src/lib/timer'
import { roundCanceled } from 'src/selectors'

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
  (dispatch, getState) => {
    dispatch(roundStarted())

    const subscription = timerStart().subscribe(
      timeRemaining => {
        if (roundCanceled(getState()))
          subscription.dispose()
        else
          dispatch(timeAdvanced(timeRemaining))
      },
      () => {},
      () => dispatch(roundEnded())
    )

    return subscription // for testing
  }
)

