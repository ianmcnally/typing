import { createStore, combineReducers } from 'redux'
import * as reducers from 'src/reducers'

const initialState = {
  words: ['a', 'b', 'c'],
  currentWord: 0
}

export const createNewStore = (state = initialState) => (
  createStore(combineReducers(reducers), state)
)

export default createNewStore()

