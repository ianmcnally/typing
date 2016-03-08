import { ROUND_ENDED, ROUND_STARTED } from 'src/action-types'

const initialState = { started: false, ended: false }

const round = (state = initialState, action) => {
  const { type } = action

  switch (type) {
  case ROUND_STARTED:
    return { ...state, started: true, ended: false }
  case ROUND_ENDED:
    return { ...state, started: false, ended: true }
  default:
    return state
  }
}

export default round

