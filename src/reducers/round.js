import { ROUND_STARTED } from 'src/action-types'

const initialState = { started: false }

const round = (state = initialState, action) => {
  const { type } = action

  switch (type) {
  case ROUND_STARTED:
    return { ...state, started: true }
  default:
    return state
  }
}

export default round

