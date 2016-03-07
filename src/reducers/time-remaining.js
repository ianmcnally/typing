import { TIME_ADVANCED, ROUND_ENDED } from 'src/action-types'

const timeRemaining = (state = null, action) => {
  const { type, timeRemaining } = action

  switch (type) {
  case TIME_ADVANCED:
    return timeRemaining
  case ROUND_ENDED:
    return null
  default:
    return state
  }

}

export default timeRemaining

