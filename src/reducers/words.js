import { WORDS_FETCHED } from 'src/action-types'

const defaultState = []

const words = (state = defaultState, action) => {
  const { type, words } = action

  switch (type) {
  case WORDS_FETCHED:
    return words
  default:
    return state
  }

}

export default words
