import { TIME_ADVANCED, ROUND_ENDED } from 'src/action-types'

const timeRemaining = (state = 60, action) => {
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

