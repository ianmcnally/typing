import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from 'src/reducers'
import thunk from 'redux-thunk'

const initialState = {
  words: ['a', 'b', 'c']
}

export const createNewStore = (state = initialState) => (
  createStore(combineReducers(reducers), state, applyMiddleware(thunk))
)

export default createNewStore()

