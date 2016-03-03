import { ADVANCE_A_WORD } from 'src/action-types'

const initialState = []

const submittedWords = (state = initialState, action) => {
  const { type, submission } = action

  switch (type) {
  case ADVANCE_A_WORD:
    return [...state, submission]
  default:
    return state
  }
}

export default submittedWords
