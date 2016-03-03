import { SUBMISSION_GRADED } from 'src/action-types'

const initialState = []

const submittedWords = (state = initialState, action) => {
  const { type, submission } = action

  switch (type) {
  case SUBMISSION_GRADED:
    return [...state, submission]
  default:
    return state
  }
}

export default submittedWords
