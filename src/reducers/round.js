import { ROUND_ENDED, ROUND_STARTED } from 'src/action-types'

const initialState = { started: false }

const round = (state = initialState, action) => {
  const { type } = action

  switch (type) {
  case ROUND_STARTED:
    return { ...state, started: true }
  case ROUND_ENDED:
    return { ...state, started: false }
  default:
    return state
  }
}

export default round

