import { createStore, combineReducers } from 'redux'
import * as reducers from 'src/reducers'

const initialState = {
  words : ['a', 'b', 'c']
}

const createNewStore = () => (
  createStore(combineReducers(reducers), initialState)
)

export default createNewStore
