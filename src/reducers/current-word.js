import { ADVANCE_A_WORD } from 'src/action-types'

const initialState = 0

const currentWord = (state = initialState, action) => {
  const { type } = action

  switch (type) {
  case ADVANCE_A_WORD:
    return state + 1
  default:
    return state
  }

}

export default currentWord

