import { RETRY } from 'src/action-types'
import { getWords } from 'src/actions/get-words'

export const retry = () =>
  dispatch => {
    dispatch({ type: RETRY })
    dispatch(getWords())
  }
