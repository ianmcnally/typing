import { TIME_ADVANCED, ROUND_ENDED } from 'src/action-types'
import { ROUND_DURATION } from 'src/constants'

const timeRemaining = (state = ROUND_DURATION, action) => {
  const { type, timeRemaining } = action

  switch (type) {
  case TIME_ADVANCED:
    return timeRemaining
  case ROUND_ENDED:
    return 0
  default:
    return state
  }

}

export default timeRemaining

